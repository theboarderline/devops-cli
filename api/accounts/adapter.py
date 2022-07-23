from allauth.account.adapter import DefaultAccountAdapter
from django import settings
from messaging.sendgrid_email import send_intro_email, send_admin_email


class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):

        ret_val = super(CustomAccountAdapter, self).save_user(
            request, user, form, commit
        )

        send_intro_email(user)

        subject = 'NEW USER !!!'
        msg = f'CGS has a new user: {user.email}'
        send_admin_email(subject, msg)

        return ret_val
