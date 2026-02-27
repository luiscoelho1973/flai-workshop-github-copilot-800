from rest_framework import serializers
from .models import User, Team, TeamMember, Activity, LeaderboardEntry, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'age']

    def get_id(self, obj):
        return str(obj.pk)


class TeamMemberSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = TeamMember
        fields = ['id', 'user', 'user_name']


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    members = TeamMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'members']

    def get_id(self, obj):
        return str(obj.pk)


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_name', 'activity_type', 'duration', 'date']

    def get_id(self, obj):
        return str(obj.pk)


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user_name = serializers.CharField(source='user.name', read_only=True)
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user', 'user_name', 'score', 'team', 'team_name']

    def get_id(self, obj):
        return str(obj.pk)


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'exercises']

    def get_id(self, obj):
        return str(obj.pk)
