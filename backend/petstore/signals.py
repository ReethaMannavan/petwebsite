# petstore/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import FooterSubscriber


@receiver(post_save, sender=FooterSubscriber)
def send_subscription_email(sender, instance, created, **kwargs):
    """
    Send a confirmation email when a new subscriber is added.
    """
    if created:
        subject = "Thank you for subscribing!"
        message = (
            f"Hello,\n\n"
            f"Thank you for subscribing to Petpalooza updates with {instance.email}.\n"
            f"We’ll keep you posted with our latest products and offers.\n\n"
            f"Cheers,\nPetpalooza Team"
        )
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [instance.email]

        try:
            send_mail(subject, message, from_email, recipient_list)
        except Exception as e:
            # You can log this error if needed
            print("Email sending failed:", e)



#login
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


