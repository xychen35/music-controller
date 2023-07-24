from rest_framework import serializers
from .models import Room

# Room Serializer
class RoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    # fields = '__all__'
    fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')