from random import randint

# Variable of type string
# Used to append to messages to twilio texts
stop_msg = '\nPlease reply STOP if you wish to stop receiving texts from Coleman Group Solutions'


# Sent to members received through marketing campaign
# HAVE NOT GIVEN TWILIO CONSENT YET
def non_web_text(name):
    option1 = f'Hello {name}, this is Silas from Coleman Group Solutions! Are you interested in talking about ' \
              f'creative home solutions?'

    option2 = f'Hello {name}, this is Silas from Coleman Group Solutions! Are you interested in talking about ' \
              f'creative home solutions?'

    option3 = f'Hello {name}, this is Silas from Coleman Group Solutions! Are you interested in talking about ' \
              f'creative home solutions?'

    options = [
        option1,
        option2,
        option3
    ]
    return get_option(options)


# Seller engagement reach out
def seller_intro_text(name, address):
    option1 = f'Good Morning {name}! Hope your day is going well! My name is Silas with Coleman Group Solutions. I am ' \
              f'reaching out to see if you own {address}? If not, please disregard this message. We\'re wishing you ' \
              f'blessings & good health!'

    option2 = f'Good Morning {name}! Hope your day is going well! My name is Silas with Coleman Group Solutions. I am ' \
              f'reaching out to see if you own {address}? If not, please disregard this message. We\'re wishing you ' \
              f'blessings & good health!'

    option3 = f'Good Morning {name}! Hope your day is going well! My name is Silas with Coleman Group Solutions. I am ' \
              f'reaching out to see if you own {address}? If not, please disregard this message. We\'re wishing you ' \
              f'blessings & good health!'

    options = [
        option1,
        option2,
        option3
    ]
    return get_option(options)


# Buyer engagement reach out
def buyer_intro_text(name, address):
    option1 = f'Good Morning {name}! Hope your day is going well! My name is Silas with Coleman Group Solutions. I am ' \
              f'reaching out to see if you are interested in investing in real estate? If not, please disregard this ' \
              f'message. We\'re wishing you blessings & good health!'

    option2 = f'Good Morning {name}! Hope your day is going well! My name is Silas with Coleman Group Solutions. I am ' \
              f'reaching out to see if you are interested in investing in real estate? If not, please disregard this ' \
              f'message. We\'re wishing you blessings & good health!'

    option3 = f'Good Morning {name}! Hope your day is going well! My name is Silas with Coleman Group Solutions. I am ' \
              f'reaching out to see if you are interested in investing in real estate? If not, please disregard this ' \
              f'message. We\'re wishing you blessings & good health!'

    options = [
        option1,
        option2,
        option3
    ]
    return get_option(options)


def get_option(options):
    rand_number = randint(0, len(options) - 1)
    return options[rand_number] + stop_msg


if __name__ == '__main__':
    print()
    print(non_web_text('Silas'))
    print()
    print(seller_intro_text('Silas', '1600 Pennsylvania Avenue NW, Washington, DC 20500'))
    print()
    print(buyer_intro_text('Silas', '1600 Pennsylvania Avenue NW, Washington, DC 20500'))
    print()
