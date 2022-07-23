from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, Member



class UserSerializer(serializers.ModelSerializer):
    member_data = serializers.SerializerMethodField()
    profile_data = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'url',
            'username',
            'first_name',
            'last_name',
            'is_staff',
            'is_superuser',
            'member_data',
            'profile_data',
        ]

    @staticmethod
    def get_member_data(obj):
        member = Member.objects.filter(owner=obj.id)
        if member.exists():
            return MemberSerializer(member[0], context={'request': None}).data
        else:
            return None

    @staticmethod
    def get_profile_data(obj):
        profile = Profile.objects.filter(owner=obj.id).order_by('-created')
        if profile.exists():
            return ProfileSerializer(profile[0], context={'request': None}).data
        else:
            return None


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            'id',
            'url',
            'owner',
            'phone',
            'city',
            'state',
            'is_buyer',
            'is_seller',
            'created',
        ]
        read_only_fields = [
            'owner',
            'created',
        ]



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'url',
            'id',
            'owner',
            'filename',
            'created',
        ]
        read_only_fields = [
            'owner',
            'created',
        ]