from flask import Flask, request, render_template,flash,jsonify
from flask_mail import Mail, Message
import os

app = Flask(__name__)

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    MAIL_USERNAME=os.environ.get('MAIL_USERNAME'),
    MAIL_PASSWORD=os.environ.get('MAIL_PASSWORD'),
    MAIL_DEFAULT_SENDER=os.environ.get('MAIL_USERNAME'),
    MAIL_MAX_EMAILS=None,
    MAIL_ASCII_ATTACHMENTS=False,
    MAIL_DEBUG=True  # Enable debug mode for detailed logs
)

mail = Mail(app)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        msg = Message(
            subject=f'New message from {name}',
            recipients=[os.environ.get('MAIL_USERNAME')],
            body=f"""
            From: {name}
            Sender Email: {email}
            Message:
            {message}
            """
        )
        
        mail.send(msg)
        return jsonify({'status': 'success', 'message': 'Email sent successfully!'})
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 9000)))