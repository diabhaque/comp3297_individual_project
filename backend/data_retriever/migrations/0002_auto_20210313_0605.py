# Generated by Django 3.1.7 on 2021-03-13 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_retriever', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='population_size',
            field=models.BigIntegerField(),
        ),
    ]
