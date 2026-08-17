from rest_framework import serializers
from .models import LostItem, FoundItem, MatchResult, UserProfile, Message
from django.contrib.auth.models import User


class LostItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = LostItem
        fields = '__all__'


class FoundItemSerializer(serializers.ModelSerializer):

    owner_username = serializers.CharField(
        source='user.username',
        read_only=True
    )
    claimant_username = serializers.CharField(
    source='claimant.username',
    read_only=True
)
    class Meta:
        model = FoundItem
        fields = '__all__'


class UserRegisterSerializer(serializers.ModelSerializer):

    phone = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'phone',
            'password'
        ]

    def create(self, validated_data):

        phone = validated_data.pop('phone')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        user.is_active = False
        user.save()

        UserProfile.objects.create(
            user=user,
            phone=phone
        )

        return user

class UserLoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()



class MatchResultSerializer(serializers.ModelSerializer):

    found_item_id = serializers.IntegerField(
        source='found_item.id'
    )

    class Meta:

        model = MatchResult

        fields = [

            'id',

            'score',

            'found_item_id'

        ]

class MessageSerializer(serializers.ModelSerializer):

    sender_username = serializers.CharField(
        source='sender.username',
        read_only=True
    )

    receiver_username = serializers.CharField(
        source='receiver.username',
        read_only=True
    )

    class Meta:

        model = Message

        fields = '__all__'
