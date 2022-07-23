from rest_framework import serializers

from .models import Deal, DealType, State, Question, Testimonial
from accounts.models import Member
from houses.models import House

from accounts.serializers import MemberSerializer
from houses.serializers import HouseSerializer


class DealSerializer(serializers.ModelSerializer):
    house_data = serializers.SerializerMethodField()
    buyer_data = serializers.SerializerMethodField()

    class Meta:
        model = Deal
        fields = [
            'id',
            'url',
            'stage',
            'priority',
            'house',
            'house_data',
            'buyer',
            'buyer_data',
            'buyer_price',
            'seller_price',
            'deal_price',
            'created',
        ]
        read_only_fields = [
            'created',
        ]

    @staticmethod
    def get_house_data(obj):
        house = House.objects.filter(id=obj.house.id).order_by('-created')
        if house.exists():
            return HouseSerializer(house[0], context={'request': None}).data
        else:
            return None

    @staticmethod
    def get_buyer_data(obj):
        buyer = Member.objects.filter(id=obj.buyer.id).order_by('-created')
        if buyer.exists():
            return MemberSerializer(buyer[0], context={'request': None}).data
        else:
            return None


class DealTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DealType
        fields = [
            'id',
            'url',
            'deal_type',
            'created',
        ]
        read_only_fields = [
            'created',
        ]


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = [
            'id',
            'url',
            'state_long',
            'state_short',
            'created',
        ]
        read_only_fields = [
            'created',
        ]


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id',
            'url',
            'question',
            'answer',
            'created',
        ]
        read_only_fields = [
            'created',
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    member_data = serializers.SerializerMethodField()
    deal_data = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            'id',
            'url',
            'member',
            'member_data',
            'member_testimonial',
            'deal',
            'deal_data',
            'short_description',
            'created',
        ]
        read_only_fields = [
            'created',
            'member',
        ]

    @staticmethod
    def get_member_data(obj):
        if obj.member:
            member = Member.objects.filter(id=obj.member.id).order_by('-created')
            if member.exists():
                return MemberSerializer(member[0], context={'request': None}).data
            
        return None

    @staticmethod
    def get_deal_data(obj):
        if obj.deal:
            deal = Deal.objects.filter(id=obj.deal.id).order_by('-created')
            if deal.exists():
                return DealSerializer(deal[0], context={'request': None}).data

        return None

