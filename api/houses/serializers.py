from rest_framework import serializers

from .models import House, Picture


class HouseSerializer(serializers.ModelSerializer):
    pictures = serializers.SerializerMethodField()

    class Meta:
        model = House
        fields = [
            'id',
            'url',
            'seller',
            'deal_type',
            'sell_range_lower',
            'sell_range_upper',
            'display',
            'address',
            'city',
            'state',
            'zipcode',
            'num_bed',
            'num_bath',
            'sq_ft',
            'basement_cond',
            'occupancy',
            'land_use',
            'construct_type',
            'notes',
            'pictures',
            'created',
        ]
        read_only_fields = [
            'display',
            'seller',
            'created',
        ]

    @staticmethod
    def get_pictures(obj):
        pictures = Picture.objects.filter(house=obj.id).order_by('-created')
        return PictureSerializer(pictures, many=True, context={'request': None}).data


class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = [
            'id',
            'url',
            'house',
            'filename',
            'description',
            'created',
        ]
        read_only_fields = [
            'created',
        ]

