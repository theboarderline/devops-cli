from django.db import models
from django.utils import timezone


class Profile(models.Model):
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    filename = models.FileField(null=True, upload_to='profiles/')

    created = models.DateTimeField(default=timezone.now, null=True)

    def __int__(self):
        return self.id


class Member(models.Model):

    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    phone = models.CharField(max_length=16)

    city = models.CharField(max_length=32, null=True)

    state = models.CharField(max_length=32, null=True)

    is_buyer = models.BooleanField(default=False)

    is_seller = models.BooleanField(default=False)

    can_text = models.BooleanField(default=True)

    created = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        prefix = 'BUYER:' if self.is_buyer else 'SELLER:'
        return f'{prefix} {self.owner.username}'


