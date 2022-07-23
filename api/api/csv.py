import os
from .gcs import upload_blob
from accounts.models import Member
from houses.models import House

from django import settings


def export_csv_content(model, filename):
    csv_content = ''

    fields = model._meta.get_fields()
    for field in fields:
        csv_content += f'{field.name},'

    csv_content += '\n'

    items = model.objects.all().order_by('-created')
    for item in items:
        for field in fields:
            csv_content += str(getattr(item, field.name)) + ','

        csv_content += '\n'

    current_dir = os.path.dirname(os.path.dirname(__file__))
    output_path = os.path.join(current_dir, f'var/{filename}.csv')

    with open(output_path, 'w') as output_file:
        output_file.write(csv_content)

    push_csv_content(filename)


def sync_sheets(filename):
    pass


def push_csv_content(filename):
    upload_blob(settings.GS_STATIC_BUCKET_NAME,
                f'var/{filename}.csv', f'csv/{filename}.csv')
    sync_sheets(filename)
