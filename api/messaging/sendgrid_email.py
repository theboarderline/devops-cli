from django.contrib.auth.models import User
from django import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from .config import intro_template_id, seller_intro_template_id, buyer_intro_template_id


def send_email(address, subject, msg, template_id=None):
    if not address or not subject or not msg:
        return

    message = Mail(
        from_email=settings.EMAIL_HOST_USER,
        to_emails=address,
        subject=subject,
        html_content=msg
    )

    if template_id:
        message.template_id = template_id

    try:
        sg = SendGridAPIClient(settings.SENDGRID_KEY)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)


def send_admin_email(subject, msg):
    if settings.LIFECYCLE == 'stage' or settings.LIFECYCLE == 'prod':
        for user in User.objects.filter(is_superuser=True):
            if user.email:
                send_email(user.email, subject, msg)


def send_intro_email(user):
    subject = 'Welcome to Coleman Group Solutions!'
    msg = 'Thank you for joining! If you are interested in finding a solution for your property...'
    send_email(user.email, subject, msg, intro_template_id)


def send_seller_lead_email(user):
    subject = 'Welcome seller!'
    msg = 'Thank you for joining Coleman Group Solutions'
    send_email(user.email, subject, msg, seller_intro_template_id)


def send_buyer_lead_email(buyer):
    subject = 'Welcome investor!'
    msg = 'Thank you for joining Coleman Group Solutions'
    send_email(buyer.user.email, subject, msg, buyer_intro_template_id)
