from django.db import models

#navbar

class NavbarSettings(models.Model):
    navsite_name = models.CharField(max_length=200, default="PetPalooza")
    nav_logo = models.ImageField(upload_to="navbar/logo/")
    nav_contact_phone = models.CharField(max_length=50, blank=True, null=True)
    nav_contact_email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return "Navbar Settings"



#categories
from django.db import models

# Category / Subcategory / Subitem Hierarchy
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='subcategory/', null=True, blank=True)

    def __str__(self):
        return f"{self.category.name} > {self.name}"


class Subitem(models.Model):
    subcategory = models.ForeignKey(Subcategory, related_name='subitems', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='subitem/', null=True, blank=True)

    def __str__(self):
        return f"{self.subcategory.name} > {self.name}"


# Product Images
class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return str(self.image)


# Product Model
class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, null=True, blank=True)
    subitem = models.ForeignKey(Subitem, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    weight = models.CharField(max_length=50, blank=True)  # e.g., 2kg, 100gm
    image = models.ImageField(upload_to='products/')
    additional_images = models.ManyToManyField(ProductImage, blank=True)
    brand = models.CharField(max_length=100, blank=True)
    coupon_code = models.CharField(max_length=20, blank=True)
    manufacturer = models.CharField(max_length=100, blank=True)
    importer_name = models.CharField(max_length=100, blank=True)
    importer_address = models.TextField(blank=True)
    per_gram_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    mrp = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rating = models.FloatField(default=0)

    def __str__(self):
        return self.name




#productdescription
from django.db import models
from django.contrib.auth.models import User
from .models import Product   # keep using your existing Product model

# ---- Section 2: Detailed Product Description ----
class ProductDetail(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name="detail")
    heading = models.CharField(max_length=255, default="Product Description")
    
    # Example: 5 title/paragraphs
    title1 = models.CharField(max_length=255, blank=True)
    paragraph1 = models.TextField(blank=True)
    title2 = models.CharField(max_length=255, blank=True)
    paragraph2 = models.TextField(blank=True)
    title3 = models.CharField(max_length=255, blank=True)
    paragraph3 = models.TextField(blank=True)
    title4 = models.CharField(max_length=255, blank=True)
    paragraph4 = models.TextField(blank=True)
    title5 = models.CharField(max_length=255, blank=True)
    paragraph5 = models.TextField(blank=True)

    # Right-side image
    image = models.ImageField(upload_to="product_details/", blank=True, null=True)

    def __str__(self):
        return f"Details for {self.product.name}"


# ---- Section 3: Reviews & Ratings ----
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveIntegerField(default=0)  # 1 to 5
    review_text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']  # latest first

    def __str__(self):
        return f"Review {self.rating}★ by {self.user.username} on {self.product.name}"




#promo

from .models import Category

class Promo(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="promos")
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='promos/')
    bg_class = models.CharField(max_length=20, blank=True)  # e.g., bg-green-50

    def __str__(self):
        return f"{self.category.name} - {self.title}"



#herosection
from django.db import models

class HeroSection(models.Model):
    LAYOUT_CHOICES = [
        ("layout1", "Layout 1"),
        ("layout2", "Layout 2"),
        ("layout3", "Layout 3"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    button_text = models.CharField(max_length=100, blank=True, null=True)
    button_link = models.URLField(blank=True, null=True)
    main_image = models.ImageField(upload_to="hero/")
    layout_type = models.CharField(max_length=20, choices=LAYOUT_CHOICES, default="layout1")
    order = models.PositiveIntegerField(default=0, help_text="Slide order")

    def __str__(self):
        return f"{self.title} ({self.layout_type})"


class HeroSubItem(models.Model):
    hero_section = models.ForeignKey(HeroSection, related_name="subitems", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="hero/subitems/", blank=True, null=True)
    text = models.CharField(max_length=255, blank=True, null=True)
    shape = models.CharField(
        max_length=20,
        choices=[("rectangle", "Rectangle"), ("diamond", "Diamond"), ("icon", "Icon")],
        default="rectangle"
    )
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"SubItem for {self.hero_section.title}"


#home-last3section
from django.db import models

class HomepagePromoSection(models.Model):  # Section 1
    title = models.CharField(max_length=255)
    description = models.TextField()
    button_text = models.CharField(max_length=100)
    button_link = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to="homepage/promo/")
    discount_text = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class HomepageDealSection(models.Model):  # Section 2
    description = models.TextField()
    image = models.ImageField(upload_to="homepage/deal/")
    button_text = models.CharField(max_length=100)
    button_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Homepage Deal {self.id}"


class HomepageServiceCard(models.Model):  # Section 3 cards
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="homepage/services/")

    def __str__(self):
        return self.title



#home-shopbypet
from django.db import models

class ShopByPet(models.Model):
    image = models.ImageField(upload_to="shop_by_pet/")
    title = models.CharField(max_length=100, blank=True)  # new title field
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title or f"Pet Image {self.id}"





#aboutpage
from django.db import models

# 1st Section (Hero/Mission Section)
class AboutHero(models.Model):
    image = models.ImageField(upload_to="about/hero/")
    title1 = models.CharField(max_length=255)
    paragraph1 = models.TextField()
    title2 = models.CharField(max_length=255, blank=True, null=True)
    paragraph2 = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"About Hero Section - {self.title1}"


# 2nd Section (Cards Section)
class AboutCard(models.Model):
    image = models.ImageField(upload_to="about/cards/")
    button_text = models.CharField(max_length=100)
    button_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Card - {self.button_text}"


# 3rd Section (Split Section)
class AboutSplitSection(models.Model):
    title = models.CharField(max_length=255)
    paragraph = models.TextField()
    image = models.ImageField(upload_to="about/split/")

    def __str__(self):
        return self.title


#contactPage

from django.db import models

class ContactHeader(models.Model):
    title = models.CharField(max_length=200, help_text="Main heading e.g. 'Contact Us'")
    subtitle = models.CharField(max_length=300, help_text="Description text")
    button_text = models.CharField(max_length=50, default="Sign In")
    button_link = models.URLField(blank=True, null=True)
    icon = models.ImageField(upload_to="contact/icons/", blank=True, null=True)

    def __str__(self):
        return self.title


class QuickLink(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True, null=True)
    icon = models.ImageField(upload_to="contact/icons/")
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class BrowseTopic(models.Model):
    title = models.CharField(max_length=100)
    icon = models.ImageField(upload_to="contact/icons/")
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class ContactInfo(models.Model):
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Contact Info ({self.email or 'No Email'})"




#petservicecategory
from django.db import models


# ---------------- Section 1: Hero ----------------
class PetServiceHero(models.Model):
    left_image = models.ImageField(upload_to="petservice/hero/")
    right_image = models.ImageField(upload_to="petservice/hero/")
    logo = models.ImageField(upload_to="petservice/hero/")
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title


class PetServiceHeroItem(models.Model):
    hero = models.ForeignKey(PetServiceHero, on_delete=models.CASCADE, related_name="items")
    icon = models.ImageField(upload_to="petservice/hero/icons/")
    label = models.CharField(max_length=100)

    def __str__(self):
        return self.label


# ---------------- Section 2: Pet Services ----------------
class PetServiceSection(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    customer_service_text = models.CharField(max_length=200, default="Customer Service")
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.title


class PetServiceColumn(models.Model):
    section = models.ForeignKey(PetServiceSection, on_delete=models.CASCADE, related_name="columns")
    title = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="petservice/columns/", blank=True, null=True)
    button_text = models.CharField(max_length=100, blank=True, null=True)
    button_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title if self.title else "Pet Service Column"


# ---------------- Section 3: Specials ----------------
class PetServiceSpecial(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    button_text = models.CharField(max_length=100)
    button_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title




#consult a vet
from django.db import models

# 1. Hero Section
class ConsultVetHero(models.Model):
    image = models.ImageField(upload_to="consultvet/hero/")
    title = models.CharField(max_length=255)
    subtitle = models.TextField(blank=True, null=True)
    button_text = models.CharField(max_length=100, default="Consult Now")
    button_link = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Consult Vet Hero"
        verbose_name_plural = "Consult Vet Hero"

    def __str__(self):
        return self.title


# 2. Info Bar Section (Verified Doctors / Free follow-up / Medicine delivery)
class ConsultVetInfoBar(models.Model):
    icon = models.ImageField(upload_to="consultvet/infobar/")
    text = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Consult Vet Info Bar"
        verbose_name_plural = "Consult Vet Info Bar"

    def __str__(self):
        return self.text


# 3. Services Section (General Checkup, Skin Issues, etc.)
class ConsultVetService(models.Model):
    icon = models.ImageField(upload_to="consultvet/services/")
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Consult Vet Service"
        verbose_name_plural = "Consult Vet Services"

    def __str__(self):
        return self.title


# 4. Highlight Section (Image half inside/outside)
class ConsultVetHighlight(models.Model):
    image = models.ImageField(upload_to="consultvet/highlight/")
    description = models.TextField()
    button_text = models.CharField(max_length=100, default="Consult Now")
    button_link = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Consult Vet Highlight"
        verbose_name_plural = "Consult Vet Highlight"

    def __str__(self):
        return self.description[:50]


# 5. Extra Cards Section
class ConsultVetCard(models.Model):
    image = models.ImageField(upload_to="consultvet/cards/")
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Consult Vet Card"
        verbose_name_plural = "Consult Vet Cards"

    def __str__(self):
        return self.text[:50]



















#footer
from django.db import models

class FooterSettings(models.Model):
    footer_logo = models.ImageField(upload_to="footer/", blank=True, null=True)
    footer_text = models.TextField(blank=True, null=True)

    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    youtube = models.URLField(blank=True, null=True)
    whatsapp = models.URLField(blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Footer Settings"


class FooterSupportLink(models.Model):
    title = models.CharField(max_length=100)
    url = models.CharField(max_length=255)  # Can be internal (React Router) or external
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


class FooterPetpaloozaLink(models.Model):
    title = models.CharField(max_length=100)
    url = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


class FooterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email



#login

from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}'s profile"



#cart

from django.db import models
from django.contrib.auth.models import User
from .models import Product   # adjust path if needed

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user.username}"

    @property
    def subtotal(self):
        return sum(item.subtotal for item in self.items.all())

    @property
    def shipping_cost(self):
        # Example: flat ₹99, free if subtotal > 2000
        if self.subtotal > 2000:
            return 0
        return 99

    @property
    def total(self):
        return self.subtotal + self.shipping_cost


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} ({self.quantity})"

    @property
    def subtotal(self):
        return self.product.price * self.quantity



#checkout
from django.db import models
from django.conf import settings
from .models import Product, CartItem

User = settings.AUTH_USER_MODEL

class Order(models.Model):
    PAYMENT_CHOICES = [
        ("online", "Online Payment"),
        ("cod", "Cash on Delivery"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    apartment = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    pincode = models.CharField(max_length=10)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES)
    save_info = models.BooleanField(default=False)
    subscribe = models.BooleanField(default=False)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} by {self.user}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
