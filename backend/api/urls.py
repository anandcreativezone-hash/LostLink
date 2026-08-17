from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import *

urlpatterns = [
    #Lost items
    path('lostitems/create/', createLostItem),
    path('lostitems/view/', viewLostitem),
    path('lostitems/delete/<int:id>/', deleteLostItem),
    path('lostitems/update/<int:id>/', updateLostItem),
    path('lostitems/myitems/', myLostItems),
    path('lostitems/matches/<int:id>/',viewMatches),
    #found item
    path('founditems/create/', createFoundItem),
    path('founditems/view/', viewFoundItem),
    path('founditems/delete/<int:id>/', deleteFoundItem),
    path('founditems/update/<int:id>/', updateFoundItem),
    path('founditems/myitems/', myFoundItems),
    #users
    path('users/register/', registeruser),
    #login
    path('users/login/', loginuser),
    #jwt urls
    path('token/',TokenObtainPairView.as_view()),
    path('token/refresh/',TokenRefreshView.as_view()),
    #serach
    path('lostitems/search/', searchLostItems),


    #admin

    path('admin/pending-users/', pendingUsers),
    path('admin/approve-user/<int:id>/', approveUser),
    path('admin/delete-user/<int:id>/', deletePendingUser),
    path('admin/approved-users/', approvedUsers),
    path('users/current/', currentUser),


    #messages
    path('messages/send/',sendMessage),
    path('messages/inbox/',inboxMessages),
    path('messages/unread-count/',unreadCount),
    path(
    'messages/unread-count/',
    unreadMessageCount
),
path(
    'messages/archive/',
    archiveMessages
),

path(
    'messages/archive/delete/<int:id>/',
    deleteArchiveMessage
),
path(
    'founditems/claim/<int:id>/',
    claimFoundItem
),

path(
    'founditems/accept/<int:id>/',
    acceptClaim
),

path(
    'founditems/reject/<int:id>/',
    rejectClaim
),

path(
    'founditems/resolve/<int:id>/',
    resolveClaim
),
path(
    'founditems/manual-list/',
    manualFoundItems
),
path(
    'founditems/details/<int:id>/',
    foundItemDetails
),
path(
    'admin/resolved-items/',
    resolvedFoundItems
),

path(
    'admin/resolved-item-details/<int:id>/',
    resolvedFoundItemDetails
),

path(
    'admin/resolved-items/',
    adminResolvedItems
),

path(
    'admin/resolved-items/<int:id>/',
    adminResolvedItemDetails
),
]