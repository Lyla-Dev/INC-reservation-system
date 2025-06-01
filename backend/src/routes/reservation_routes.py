from flask import Blueprint, request, jsonify, session
from database.connection import get_db_connection
from datetime import datetime, timedelta

reservation_bp = Blueprint('reservation', __name__)

@reservation_bp.route('/my_reservations', methods=['GET'])
def get_my_reservations():
    user_id = session.get('user_id') 

    if not user_id:
        return jsonify({'error': '로그인이 필요합니다.'}), 401

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT
                r.id,
                r.reservation_date,
                r.meal_type,
                r.reservation_time,
                r.customer_phone_number,
                r.number_of_guests,
                dt.location AS table_type
            FROM
                reservations r
            JOIN
                dining_tables dt ON r.table_id = dt.id
            WHERE
                r.user_id = ?
            ORDER BY
                r.reservation_date DESC, r.meal_type DESC
        """, (user_id,))
        
        reservations = []
        for row in cursor.fetchall():
            (
                reservation_id,
                reservation_date_str,
                meal_type,
                reservation_time_str,
                customer_phone_number,
                number_of_guests,
                table_type
            ) = row

            reservation_datetime_str = f"{reservation_date_str} {reservation_time_str}"
            reservation_datetime = datetime.strptime(reservation_datetime_str, '%Y-%m-%d %H:%M')
            cancellation_deadline_datetime = reservation_datetime - timedelta(hours=24)
            cancellation_deadline_str = cancellation_deadline_datetime.strftime('%Y.%m.%d %H:%M')
            
            reservations.append({
                "id": reservation_id,
                "date": reservation_date_str, 
                "time": meal_type.upper(),
                "phoneNumber": customer_phone_number,
                "guests": number_of_guests,
                "tableType": table_type,
                "cancellationDeadline": cancellation_deadline_str
            })
        return jsonify(reservations)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
        
@reservation_bp.route('/reservations/<int:reservation_id>', methods=['DELETE'])
def cancel_reservation(reservation_id):
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error': '로그인이 필요합니다.'}), 401

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # 해당 예약이 현재 사용자의 것인지 확인
        cursor.execute("""
            SELECT user_id FROM reservations WHERE id = ?
        """, (reservation_id,))
        reservation_owner_id = cursor.fetchone()

        if not reservation_owner_id:
            return jsonify({'error': '예약을 찾을 수 없습니다.'}), 404
        if reservation_owner_id[0] != user_id:
            return jsonify({'error': '이 예약을 취소할 권한이 없습니다.'}), 403

        cursor.execute("DELETE FROM reservations WHERE id = ?", (reservation_id,))
        conn.commit()
        return jsonify({'message': '예약이 성공적으로 취소되었습니다.'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


@reservation_bp.route('/available_tables', methods=['GET'])
def get_available_tables():
    date = request.args.get('date') 
    meal_type = request.args.get('meal') 

    if not date or meal_type not in ('lunch', 'dinner'):
        return jsonify({'error': '날짜와 meal 파라미터를 정확히 전달하세요'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT dt.table_id
            FROM reservations r
            JOIN dining_tables dt ON r.table_id = dt.id
            WHERE r.reservation_date = ? AND r.meal_type = ?
        """, (date, meal_type))
        reserved_table_ids = [row[0] for row in cursor.fetchall()]

        cursor.execute("""
            SELECT table_id, location, capacity
            FROM dining_tables
            WHERE table_id NOT IN ({seq})
        """.format(seq=','.join(['?'] * len(reserved_table_ids))) if reserved_table_ids else """
            SELECT table_id, location, capacity
            FROM dining_tables
        """, reserved_table_ids)
        
        available_tables = [
            {"table_id": row[0], "location": row[1], "capacity": row[2]}
            for row in cursor.fetchall()
        ]

        return jsonify(available_tables)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@reservation_bp.route('/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json()

    required_fields = ['table_id', 'date', 'meal', 'name', 'phone', 'guest_count', 'card']
    if not all(field in data for field in required_fields):
        return jsonify({'error': '필수 필드가 누락되었습니다.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT id FROM dining_tables WHERE table_id = ?", (data['table_id'],))
        table = cursor.fetchone()
        if not table:
            return jsonify({'error': '해당 테이블 ID가 존재하지 않습니다.'}), 404

        table_db_id = table[0]

        cursor.execute("""
            SELECT 1 FROM reservations
            WHERE table_id = ? AND reservation_date = ? AND meal_type = ?
        """, (table_db_id, data['date'], data['meal']))
        if cursor.fetchone():
            return jsonify({'error': '이미 예약된 테이블입니다.'}), 409

        user_id = session['user_id']
        if not user_id:
            return jsonify({'error': '로그인이 필요합니다.'}), 401
        cursor.execute("""
            INSERT INTO reservations (
                user_id,
                table_id,
                reservation_date,
                meal_type,
                reservation_time,
                number_of_guests,
                customer_name,
                customer_phone_number,
                credit_card_number
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            user_id,
            table_db_id,
            data['date'],
            data['meal'],
            '12:00' if data['meal'] == 'lunch' else '18:00',
            data['guest_count'],
            data['name'],
            data['phone'],
            data['card']
        ))

        conn.commit()
        return jsonify({'message': '예약 성공!'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
