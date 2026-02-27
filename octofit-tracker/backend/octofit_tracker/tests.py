import datetime
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, TeamMember, Activity, LeaderboardEntry, Workout


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(name='Tony Stark', email='tony@avengers.com', age=45)

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Tony Stark')
        self.assertEqual(self.user.email, 'tony@avengers.com')
        self.assertEqual(self.user.age, 45)

    def test_user_str(self):
        self.assertEqual(str(self.user), 'Tony Stark')


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Team Marvel')
        self.user = User.objects.create(name='Steve Rogers', email='steve@avengers.com', age=105)
        self.member = TeamMember.objects.create(team=self.team, user=self.user)

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Team Marvel')

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Team Marvel')

    def test_team_member(self):
        self.assertEqual(self.member.team, self.team)
        self.assertEqual(self.member.user, self.user)


class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(name='Thor Odinson', email='thor@avengers.com', age=1500)
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Hammer Lifting',
            duration=120.0,
            date=datetime.date.today()
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Hammer Lifting')
        self.assertEqual(self.activity.duration, 120.0)

    def test_activity_str(self):
        self.assertIn('Thor Odinson', str(self.activity))


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(name='Diana Prince', email='diana@justiceleague.com', age=800)
        self.team = Team.objects.create(name='Team DC')
        self.entry = LeaderboardEntry.objects.create(user=self.user, score=950, team=self.team)

    def test_leaderboard_entry(self):
        self.assertEqual(self.entry.score, 950)
        self.assertEqual(self.entry.team.name, 'Team DC')


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Avengers Endurance',
            description='High intensity training',
            exercises='[{"name": "Shield Run", "reps": 3}]'
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Avengers Endurance')

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Avengers Endurance')


class UserAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(name='Peter Parker', email='peter@avengers.com', age=21)

    def test_list_users(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_user(self):
        url = reverse('user-detail', args=[self.user.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Peter Parker')


class TeamAPITest(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Team Marvel')

    def test_list_teams(self):
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ActivityAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(name='Clark Kent', email='clark@justiceleague.com', age=38)
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Flying Practice',
            duration=60.0,
            date=datetime.date.today()
        )

    def test_list_activities(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(name='Barry Allen', email='barry@justiceleague.com', age=28)
        self.team = Team.objects.create(name='Team DC')
        LeaderboardEntry.objects.create(user=self.user, score=790, team=self.team)

    def test_list_leaderboard(self):
        url = reverse('leaderboardentry-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    def setUp(self):
        Workout.objects.create(
            name='Justice League Power Training',
            description='Strength training for DC heroes',
            exercises='[{"name": "Lasso Swings", "reps": 5}]'
        )

    def test_list_workouts(self):
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class APIRootTest(APITestCase):
    def test_api_root(self):
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
