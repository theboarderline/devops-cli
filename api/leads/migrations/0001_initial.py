# Generated by Django 3.1.13 on 2021-09-27 02:04

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('houses', '0001_initial'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DealType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deal', models.CharField(max_length=32, null=True)),
                ('created', models.DateTimeField(default=django.utils.timezone.now, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=256)),
                ('answer', models.CharField(max_length=256)),
                ('created', models.DateTimeField(default=django.utils.timezone.now, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state_long', models.CharField(max_length=32)),
                ('state_short', models.CharField(max_length=8)),
                ('created', models.DateTimeField(default=django.utils.timezone.now, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Deal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stage', models.CharField(choices=[('NEW', 'New deal'), ('FOUND_BUYER', 'Found buyer'), ('FOUND_SELLER', 'Found seller'), ('NEGOTIATION', 'In negotiation'), ('CLOSED', 'Has closed'), ('FAILED', 'Has failed')], default=('NEW', 'New deal'), max_length=16)),
                ('priority', models.CharField(choices=[('HOT', 'Hot deal'), ('MEDIUM', 'Average deal'), ('COLD', 'Cold deal')], default=('HOT', 'Hot deal'), max_length=16)),
                ('buyer_price', models.IntegerField(default=0)),
                ('seller_price', models.IntegerField(default=0)),
                ('deal_price', models.IntegerField(default=0)),
                ('created', models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.member')),
                ('house', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='houses.house')),
            ],
        ),
    ]
