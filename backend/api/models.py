from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Trainee(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField(max_length=100)


class LostItem(models.Model):

    CATEGORY_CHOICES = [
        ('Electronics', 'Electronics'),
        ('Document', 'Document'),
        ('Accessory', 'Accessory'),
        ('Wallet', 'Wallet'),
        ('Keys', 'Keys'),
        ('Clothing', 'Clothing'),
        ('Other', 'Other')
    ]

    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('Claim Pending', 'Claim Pending'),
        ('Resolved', 'Resolved')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    location = models.CharField(max_length=100)
    date_lost = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Open'
    )

    reward = models.IntegerField(default=0)

    image = models.ImageField(
        upload_to='lost_items/',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title    
    









class FoundItem(models.Model):

    CATEGORY_CHOICES = [
        ('Electronics', 'Electronics'),
        ('Document', 'Document'),
        ('Accessory', 'Accessory'),
        ('Wallet', 'Wallet'),
        ('Keys', 'Keys'),
        ('Clothing', 'Clothing'),
        ('Other', 'Other')
    ]

    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Claim Pending', 'Claim Pending'),
        ('Resolved', 'Resolved')
    ]

    # User who created the found item
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    claimed_lost_item = models.ForeignKey(
    LostItem,
    on_delete=models.SET_NULL,
    null=True,
    blank=True
)
    # Item Details
    title = models.CharField(max_length=100)

    description = models.TextField()

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    location = models.CharField(max_length=100)

    date_found = models.DateField()

    # Current Status
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Available'
    )

    # User who claimed this item
    claimant = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='claimed_found_items'
    )

    # Has finder accepted the claim?
    claim_accepted = models.BooleanField(
        default=False
    )

    # Item Image
    image = models.ImageField(
        upload_to='found_items/',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title
    













class MatchResult(models.Model):
    lost_item=models.ForeignKey(
        LostItem,
        on_delete=models.CASCADE
    )

    found_item=models.ForeignKey(
        FoundItem,
        on_delete=models.CASCADE
    )

    score=models.IntegerField(default=0)

    created_at=models.DateTimeField(auto_now_add=True)


class UserProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    phone = models.CharField(
        max_length=15
    )

    def __str__(self):
        return self.user.username
    


class Message(models.Model):

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )

    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_messages'
    )

    subject = models.CharField(
        max_length=200
    )

    message = models.TextField()

    attachment = models.ImageField(
        upload_to='messages/',
        null=True,
        blank=True
    )

    is_complaint = models.BooleanField(
        default=False
    )

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.sender.username} -> "
            f"{self.receiver.username}"
        )