from django.db import models
from django.utils import timezone



class Deal(models.Model):

    STAGES = [
        ('NEW', 'New deal'),
        ('FOUND_BUYER', 'Found buyer'),
        ('FOUND_SELLER', 'Found seller'),
        ('NEGOTIATION', 'In negotiation'),
        ('CLOSED', 'Has closed'),
        ('FAILED', 'Has failed'),
    ]

    PRIORITIES = [
        ('HOT', 'Hot deal'),
        ('MEDIUM', 'Average deal'),
        ('COLD', 'Cold deal'),
    ]

    stage = models.CharField(max_length=16, choices=STAGES, default=STAGES[0])

    priority = models.CharField(max_length=16, choices=PRIORITIES, default=PRIORITIES[0])

    house = models.ForeignKey('houses.House', on_delete=models.CASCADE)

    buyer = models.ForeignKey('accounts.Member', on_delete=models.CASCADE)

    buyer_price = models.IntegerField(default=0)

    seller_price = models.IntegerField(default=0)

    deal_price = models.IntegerField(default=0)

    created = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        return f'DEAL: {self.id}'


class DealType(models.Model):

    deal_type = models.CharField(max_length=32, null=True)

    created = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        return f'DEAL TYPE: {self.deal_type}'


class State(models.Model):

    state_long = models.CharField(max_length=32)

    state_short = models.CharField(max_length=8)

    created = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        return f'STATE: {self.state_long}'


class Question(models.Model):

    question = models.CharField(max_length=256)

    answer = models.CharField(max_length=1024)

    created = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        return f'QUESTION: {self.question}'


class Testimonial(models.Model):

    member = models.ForeignKey('accounts.Member', on_delete=models.CASCADE, null=True)

    deal = models.ForeignKey('leads.Deal', on_delete=models.CASCADE, null=True)

    member_testimonial = models.CharField(max_length=512, null=True)

    short_description = models.CharField(max_length=256)

    display = models.BooleanField(default=True)

    created = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        return f'TESTIMONIAL: {self.member}'

