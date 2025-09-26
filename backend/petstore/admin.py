
#navbar
from django.contrib import admin
from .models import NavbarSettings

@admin.register(NavbarSettings)
class NavbarSettingsAdmin(admin.ModelAdmin):
    list_display = ["navsite_name", "nav_contact_phone", "nav_contact_email"]




#categories
from django.contrib import admin
from .models import Category, Subcategory, Subitem, Product, ProductImage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'slug', 'image']
    list_filter = ['category']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'category__name']

@admin.register(Subitem)
class SubitemAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'subcategory', 'slug','image']
    list_filter = ['subcategory']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'subcategory__name']

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'image']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'subcategory', 'subitem', 'price', 'weight', 'rating']
    list_filter = ['category', 'subcategory', 'subitem', 'brand']
    search_fields = ['name', 'brand', 'subcategory__name', 'subitem__name']



#productdescription
from django.contrib import admin
from .models import ProductDetail, Review

@admin.register(ProductDetail)
class ProductDetailAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "heading"]

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "user", "rating", "created_at"]
    list_filter = ["rating", "created_at"]
    search_fields = ["product__name", "user__username", "review_text"]



#promo
from django.contrib import admin
from .models import Promo

@admin.register(Promo)
class PromoAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'category', 'bg_class']
    list_filter = ['category']
    search_fields = ['title', 'category__name']



#herosection
from django.contrib import admin
from .models import HeroSection, HeroSubItem

class HeroSubItemInline(admin.TabularInline):
    model = HeroSubItem
    extra = 1  # number of empty forms to display by default
    fields = ("image", "text", "shape", "order")
    ordering = ("order",)

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ("title", "layout_type", "order")
    list_editable = ("order",)  # allows quick ordering from list view
    ordering = ("order",)
    search_fields = ("title", "description")
    inlines = [HeroSubItemInline]

@admin.register(HeroSubItem)
class HeroSubItemAdmin(admin.ModelAdmin):
    list_display = ("hero_section", "text", "shape", "order")
    list_filter = ("shape", "hero_section")
    ordering = ("hero_section", "order")


#home-shopbypet
from django.contrib import admin
from .models import ShopByPet

@admin.register(ShopByPet)
class ShopByPetAdmin(admin.ModelAdmin):
    list_display = ("id", "image_preview", "title", "order")
    list_editable = ("order", "title")

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="width:60px; height:60px; object-fit:contain;" />'
        return "No Image"

    image_preview.allow_tags = True
    image_preview.short_description = "Preview"



#homelast3section

from django.contrib import admin
from django.utils.html import format_html
from .models import HomepagePromoSection, HomepageDealSection, HomepageServiceCard


@admin.register(HomepagePromoSection)
class HomepagePromoSectionAdmin(admin.ModelAdmin):
    """
    Single-object admin for Section 1 (promo).
    Only allow one instance to be created. Provide an image preview.
    """
    list_display = ("title", "discount_text", "button_text", "image_preview")
    readonly_fields = ("image_preview",)
    fields = (
        "title",
        "description",
        "discount_text",
        ("button_text", "button_link"),
        "image",
        "image_preview",
    )
    search_fields = ("title", "description", "discount_text")
    ordering = ("-id",)

    def image_preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="max-height:160px; border-radius:8px;" />', obj.image.url)
        return "No image"
    image_preview.short_description = "Image preview"

    def has_add_permission(self, request):
        # Allow adding only if no instance exists
        return not HomepagePromoSection.objects.exists()


@admin.register(HomepageDealSection)
class HomepageDealSectionAdmin(admin.ModelAdmin):
    """
    Single-object admin for Section 2 (deal).
    Only allow one instance to be created. Provide an image preview.
    """
    list_display = ("id", "button_text", "short_description", "image_preview")
    readonly_fields = ("image_preview",)
    fields = ("description", ("button_text", "button_link"), "image", "image_preview")
    search_fields = ("description",)
    ordering = ("-id",)

    def image_preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="max-height:120px; border-radius:6px;" />', obj.image.url)
        return "No image"
    image_preview.short_description = "Image preview"

    def short_description(self, obj):
        if obj and obj.description:
            return obj.description[:80] + ("…" if len(obj.description) > 80 else "")
        return ""
    short_description.short_description = "Description"

    def has_add_permission(self, request):
        # Allow adding only if no instance exists
        return not HomepageDealSection.objects.exists()


@admin.register(HomepageServiceCard)
class HomepageServiceCardAdmin(admin.ModelAdmin):
    """
    Multi-object admin for Section 3 (service cards).
    """
    list_display = ("title", "short_description", "image_preview")
    readonly_fields = ("image_preview",)
    fields = ("title", "description", "image", "image_preview")
    search_fields = ("title", "description")
    list_per_page = 20
    ordering = ("title",)

    def image_preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="max-height:100px; border-radius:6px;" />', obj.image.url)
        return "No image"
    image_preview.short_description = "Image preview"

    def short_description(self, obj):
        if obj and obj.description:
            return obj.description[:60] + ("…" if len(obj.description) > 60 else "")
        return ""
    short_description.short_description = "Description"




#petbyservicecategory
from django.contrib import admin
from .models import (
    PetServiceHero, PetServiceHeroItem,
    PetServiceSection, PetServiceColumn,
    PetServiceSpecial
)


class PetServiceHeroItemInline(admin.TabularInline):
    model = PetServiceHeroItem
    extra = 1


@admin.register(PetServiceHero)
class PetServiceHeroAdmin(admin.ModelAdmin):
    inlines = [PetServiceHeroItemInline]
    list_display = ("title",)


class PetServiceColumnInline(admin.TabularInline):
    model = PetServiceColumn
    extra = 1


@admin.register(PetServiceSection)
class PetServiceSectionAdmin(admin.ModelAdmin):
    inlines = [PetServiceColumnInline]
    list_display = ("title", "phone_number")


@admin.register(PetServiceSpecial)
class PetServiceSpecialAdmin(admin.ModelAdmin):
    list_display = ("title", "button_text", "button_link")





#aboutpage
from django.contrib import admin
from .models import AboutHero, AboutCard, AboutSplitSection

@admin.register(AboutHero)
class AboutHeroAdmin(admin.ModelAdmin):
    list_display = ("title1", "title2")


@admin.register(AboutCard)
class AboutCardAdmin(admin.ModelAdmin):
    list_display = ("button_text", "button_link")


@admin.register(AboutSplitSection)
class AboutSplitSectionAdmin(admin.ModelAdmin):
    list_display = ("title",)



#contactpage
from django.contrib import admin
from .models import ContactHeader, QuickLink, BrowseTopic, ContactInfo


@admin.register(ContactHeader)
class ContactHeaderAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle", "button_text", "button_link")
    search_fields = ("title", "subtitle")


@admin.register(QuickLink)
class QuickLinkAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "link")
    search_fields = ("title", "description")


@admin.register(BrowseTopic)
class BrowseTopicAdmin(admin.ModelAdmin):
    list_display = ("title", "link")
    search_fields = ("title",)


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ("phone", "email", "address")
    search_fields = ("phone", "email", "address")




#footer
# petstore/admin.py
from django.contrib import admin
from django.utils.html import format_html

from .models import (
    FooterSettings,
    FooterSupportLink,
    FooterPetpaloozaLink,
    FooterSubscriber,
)


@admin.register(FooterSettings)
class FooterSettingsAdmin(admin.ModelAdmin):
    list_display = ("__str__", "updated_at", "logo_preview")
    readonly_fields = ("updated_at",)

    def logo_preview(self, obj):
        if obj.footer_logo:
            return format_html('<img src="{}" style="height:50px;"/>', obj.footer_logo.url)
        return "-"
    logo_preview.short_description = "Logo preview"


@admin.register(FooterSupportLink)
class FooterSupportLinkAdmin(admin.ModelAdmin):
    list_display = ("title", "url", "order")
    list_editable = ("order",)
    ordering = ("order",)
    search_fields = ("title", "url")


@admin.register(FooterPetpaloozaLink)
class FooterPetpaloozaLinkAdmin(admin.ModelAdmin):
    list_display = ("title", "url", "order")
    list_editable = ("order",)
    ordering = ("order",)
    search_fields = ("title", "url")


@admin.register(FooterSubscriber)
class FooterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribed_at")
    readonly_fields = ("subscribed_at",)
    search_fields = ("email",)
    ordering = ("-subscribed_at",)



#consult a vet
from django.contrib import admin
from .models import (
    ConsultVetHero,
    ConsultVetInfoBar,
    ConsultVetService,
    ConsultVetHighlight,
    ConsultVetCard,
)


@admin.register(ConsultVetHero)
class ConsultVetHeroAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "button_text")
    search_fields = ("title", "subtitle")


@admin.register(ConsultVetInfoBar)
class ConsultVetInfoBarAdmin(admin.ModelAdmin):
    list_display = ("id", "text", "order")
    list_editable = ("order",)
    ordering = ("order",)
    search_fields = ("text",)


@admin.register(ConsultVetService)
class ConsultVetServiceAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "order")
    list_editable = ("order",)
    ordering = ("order",)
    search_fields = ("title",)


@admin.register(ConsultVetHighlight)
class ConsultVetHighlightAdmin(admin.ModelAdmin):
    list_display = ("id", "description", "button_text")
    search_fields = ("description", "button_text")


@admin.register(ConsultVetCard)
class ConsultVetCardAdmin(admin.ModelAdmin):
    list_display = ("id", "text", "order")
    list_editable = ("order",)
    ordering = ("order",)
    search_fields = ("text",)
