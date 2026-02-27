import datetime
from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, TeamMember, Activity, LeaderboardEntry, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        LeaderboardEntry.objects.all().delete()
        TeamMember.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        self.stdout.write('Creating users (superheroes)...')
        # Marvel heroes
        tony = User.objects.create(name='Tony Stark', email='tony@avengers.com', age=45)
        steve = User.objects.create(name='Steve Rogers', email='steve@avengers.com', age=105)
        natasha = User.objects.create(name='Natasha Romanoff', email='natasha@avengers.com', age=35)
        thor = User.objects.create(name='Thor Odinson', email='thor@avengers.com', age=1500)
        peter = User.objects.create(name='Peter Parker', email='peter@avengers.com', age=21)

        # DC heroes
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@justiceleague.com', age=40)
        diana = User.objects.create(name='Diana Prince', email='diana@justiceleague.com', age=800)
        clark = User.objects.create(name='Clark Kent', email='clark@justiceleague.com', age=38)
        barry = User.objects.create(name='Barry Allen', email='barry@justiceleague.com', age=28)
        hal = User.objects.create(name='Hal Jordan', email='hal@justiceleague.com', age=35)

        self.stdout.write('Creating teams...')
        marvel_team = Team.objects.create(name='Team Marvel')
        dc_team = Team.objects.create(name='Team DC')

        self.stdout.write('Adding members to teams...')
        for hero in [tony, steve, natasha, thor, peter]:
            TeamMember.objects.create(team=marvel_team, user=hero)
        for hero in [bruce, diana, clark, barry, hal]:
            TeamMember.objects.create(team=dc_team, user=hero)

        self.stdout.write('Creating activities...')
        today = datetime.date.today()
        activities_data = [
            (tony, 'Iron Man Flight Training', 90.0),
            (steve, 'Shield Throwing', 60.0),
            (natasha, 'Combat Training', 75.0),
            (thor, 'Hammer Lifting', 120.0),
            (peter, 'Web Slinging', 45.0),
            (bruce, 'Martial Arts', 90.0),
            (diana, 'Sword Training', 80.0),
            (clark, 'Flying Practice', 60.0),
            (barry, 'Speed Running', 30.0),
            (hal, 'Ring Construct Training', 70.0),
        ]
        for user, activity_type, duration in activities_data:
            Activity.objects.create(
                user=user,
                activity_type=activity_type,
                duration=duration,
                date=today
            )

        self.stdout.write('Creating leaderboard entries...')
        leaderboard_data = [
            (thor, 980, marvel_team),
            (diana, 950, dc_team),
            (tony, 900, marvel_team),
            (clark, 870, dc_team),
            (steve, 850, marvel_team),
            (bruce, 820, dc_team),
            (natasha, 800, marvel_team),
            (barry, 790, dc_team),
            (peter, 750, marvel_team),
            (hal, 720, dc_team),
        ]
        for user, score, team in leaderboard_data:
            LeaderboardEntry.objects.create(user=user, score=score, team=team)

        self.stdout.write('Creating workouts...')
        workouts_data = [
            (
                'Avengers Endurance Training',
                'High intensity endurance training for Marvel heroes',
                '[{"name": "Shield Run", "reps": 3, "sets": 5}, {"name": "Repulsor Blasts", "reps": 10, "sets": 3}]'
            ),
            (
                'Justice League Power Training',
                'Strength and power training for DC heroes',
                '[{"name": "Lasso Swings", "reps": 5, "sets": 4}, {"name": "Kryptonian Press", "reps": 8, "sets": 3}]'
            ),
            (
                'Superhero Circuit',
                'Full body circuit training for all heroes',
                '[{"name": "Web Jumps", "reps": 12, "sets": 3}, {"name": "Speed Bursts", "reps": 15, "sets": 4}]'
            ),
        ]
        for name, description, exercises in workouts_data:
            Workout.objects.create(name=name, description=description, exercises=exercises)

        self.stdout.write(self.style.SUCCESS('Database populated successfully with superhero test data!'))
