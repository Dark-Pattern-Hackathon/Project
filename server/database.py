import mysql.connector
from mysql.connector import Error


def insert_report(email: str, url: str, pattern_name: str, html_code: str, user_comment: str):
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='dp',
            user='root',
            password='kaku@9252'
        )

        if connection.is_connected():
            cursor = connection.cursor()

            create_table_query = """
                            CREATE TABLE IF NOT EXISTS report (
                                report_id INT AUTO_INCREMENT PRIMARY KEY,
                                email VARCHAR(50) NOT NULL,
                                url VARCHAR(255) NOT NULL,
                                pattern_name VARCHAR(100) NOT NULL,
                                html_code TEXT,
                                report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                user_comment TEXT
                            )
                        """

            cursor.execute(create_table_query)
            connection.commit()


            insert_query = 'INSERT INTO report (email, url, pattern_name, html_code, user_comment) VALUES (%s, %s, %s, %s, %s)'
            data = (email, url, pattern_name, html_code, user_comment)
            cursor.execute(insert_query, data)
            connection.commit()

    except Error as e:
        print(f"Error: {e}")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
