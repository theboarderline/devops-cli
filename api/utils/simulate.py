import requests
import json
from pprint import PrettyPrinter
from random import randint


def pprint(stuff):
    PrettyPrinter().pprint(stuff)


class djangoSimulator:

    def __init__(self):
        self.url = 'http://dev.djangogroupsolutions.com/api/'
        # self.url = 'http://127.0.0.1:8000/api/'

        self.community = 1
        self.num_lakes = 8
        self.num_sports = 5

        self.csrf = None
        self.key = None
        self.session = requests.Session()

        self.run_simulation()

    def post(self, post_url, form_data):

        print(f'POSTING to {post_url}')

        url = f'{self.url}{post_url}'
        headers = {
            'Cookie': f'csrftoken={self.csrf};',
        }
        if post_url != 'auth/registration/':
            headers['Authorization'] = f'Token {self.key}'

        print('HEADERS:')
        pprint(headers)

        res = self.session.post(url, headers=headers, data=form_data)

        res_text = res.text
        json_res = json.loads(res_text)

        print('RESPONSE:')
        pprint(json_res)
        print()

        return json_res

    def run_simulation(self):

        for i in range(0, 5):
            num = randint(0, 10)
            username = f'test{num}'
            password = 'testpassword'
            data = {
                'username': username,
                'password1': password,
                'password2': password,
            }
            response = self.post('auth/registration/', data)

            if 'key' in response:
                self.key = response['key']


if __name__ == '__main__':
    djangoSimulator()
