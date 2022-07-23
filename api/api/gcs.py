from google.cloud import storage


def get_bucket(bucket_name):
    return storage.Client().bucket(bucket_name)


def upload_blob(bucket_name, source_file_name, destination_blob_name):

    bucket = get_bucket(bucket_name)
    bucket.blob(destination_blob_name).upload_from_filename(source_file_name)

    print(f'File {source_file_name} uploaded to {destination_blob_name}')


def download_blob(bucket_name, source_blob_name, destination_file_name):

    bucket = get_bucket(bucket_name)
    bucket.blob(source_blob_name).download_to_filename(destination_file_name)

    print(f'Blob {source_blob_name} downloaded to {destination_file_name}')


