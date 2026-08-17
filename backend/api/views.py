from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from .models import Trainee,LostItem,FoundItem,MatchResult,Message
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import LostItemSerializer,FoundItemSerializer,UserRegisterSerializer,UserLoginSerializer,MatchResultSerializer,MessageSerializer
from django.utils import timezone
from datetime import timedelta
# TrainerSerializer

# Create your views here.


#lost item _______________________________________________________________________



# put into lostitem with jwt tokens added 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createLostItem(request):

    print(request.FILES)

    serializer = LostItemSerializer(data=request.data)

    if serializer.is_valid():

        lost_item = serializer.save(user=request.user)

        found_items = FoundItem.objects.filter(
            status__in=[
                'Available',
                'Claim Pending'
            ]
        )

        for found_item in found_items:

            score = 0

            # Category Match
            if lost_item.category == found_item.category:
                score += 30

            # Location Match
            if lost_item.location.lower() == found_item.location.lower():
                score += 20

            # Title Match
            lost_title_words = lost_item.title.lower().split()
            found_title_words = found_item.title.lower().split()

            common_title_words = set(lost_title_words) & set(found_title_words)

            if len(common_title_words) > 0:
                score += 30

            # Description Match
            lost_desc_words = lost_item.description.lower().split()
            found_desc_words = found_item.description.lower().split()

            common_desc_words = set(lost_desc_words) & set(found_desc_words)

            if len(common_desc_words) > 0:
                score += 20

            # Save Match
            if score > 0:

                MatchResult.objects.create(
                    lost_item=lost_item,
                    found_item=found_item,
                    score=score
                )

        return Response(
            {"message": "lost item added successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )



# new view

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewMatches(request,id):

    matches = MatchResult.objects.filter(

        lost_item_id=id,

        found_item__status__in=[
            'Available',
            'Claim Pending'
        ]

    ).order_by('-score')
    print(matches.count())
    print(matches)
    serializer = MatchResultSerializer(

        matches,

        many=True

    )

    return Response(serializer.data)
















































# view everthing in lost item
@api_view(['GET'])
def viewLostitem(request):

    obj = LostItem.objects.all()
    serializer = LostItemSerializer(obj, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)




# this is to filter so user A gets user A s lost item view only 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myLostItems(request):
    obj = LostItem.objects.filter(user=request.user)

    serializer = LostItemSerializer(obj, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)




#delete the row in lostitem
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteLostItem(request, id):

    a = LostItem.objects.get(
        id=id,
        user=request.user
    )

    a.delete()

    return Response(
        {"message": "deleted successfully"},
        status=status.HTTP_200_OK
    )




#update the row in lostitem
# update lost item

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateLostItem(request,id):

    b = LostItem.objects.get(
        id=id,
        user=request.user
    )

    serializer = LostItemSerializer(
        b,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {"message":"updated successfully"},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )



#Founditem___________________________________________________


#insert into founditem
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createFoundItem(request):
    serializer=FoundItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(
            {"message":"found item added successfully"},status=status.HTTP_201_CREATED
        )
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )




#filter so only user gets their own data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myFoundItems(request):
    obj = FoundItem.objects.filter(user=request.user)

    serializer = FoundItemSerializer(obj, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)




#view everything in found item
@api_view(['GET'])
def viewFoundItem(request):

    obj = FoundItem.objects.all()
    serializer = FoundItemSerializer(obj, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)



#delete row in founditem
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFoundItem(request, id):

    a = FoundItem.objects.get(id=id,user=request.user)
    a.delete()

    return Response(
        {"message": "deleted successfully"},
        status=status.HTTP_200_OK
    )


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateFoundItem(request, id):

    b = FoundItem.objects.get(
        id=id,
        user=request.user
    )

    serializer = FoundItemSerializer(
        b,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {"message": "updated successfully"},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


#user funtions___________________________________________________________-



#register user 
@api_view(['POST'])
def registeruser(request):
    serializer=UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message":"user created successfully"},status=status.HTTP_201_CREATED
        )
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )





@api_view(['POST'])
def loginuser(request):

    serializer = UserLoginSerializer(data=request.data)

    if serializer.is_valid():

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(
            username=username,
            password=password
        )

        if user:

            if not user.is_active:

                return Response(
                    {"message": "Account pending admin approval"},
                    status=status.HTTP_403_FORBIDDEN
                )

            return Response(
                {"message": "user logged in successfully"},
                status=status.HTTP_200_OK
            )

        else:

            return Response(
                {"message": "invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def searchLostItems(request):

    query = request.GET.get('q')

    items = LostItem.objects.filter(
        user=request.user,
        title__icontains=query
    )

    serializer = LostItemSerializer(items, many=True)

    return Response(serializer.data)








#admin



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pendingUsers(request):

    if not request.user.is_staff:

        return Response(
            {"message":"Access Denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    users = User.objects.filter(
    is_active=False
).exclude(
    username='admin'
)


    data=[]

    for user in users:

        data.append({

            "id":user.id,
            "username":user.username,
            "email":user.email

        })

    return Response(data)








@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def approveUser(request,id):

    if not request.user.is_staff:

        return Response(
            {"message":"Access Denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    user = User.objects.get(id=id)

    user.is_active=True

    user.save()

    return Response(
        {"message":"User Approved Successfully"}
    )





@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePendingUser(request,id):

    if not request.user.is_staff:

        return Response(
            {"message":"Access Denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    user = User.objects.get(id=id)

    user.delete()

    return Response(
        {"message":"User Deleted Successfully"}
    )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def approvedUsers(request):

    if not request.user.is_staff:
        return Response(
            {"message":"Access Denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    users = User.objects.filter(
        is_active=True
    ).exclude(
        username='admin'
    )

    data=[]

    for user in users:

        data.append({
            "id":user.id,
            "username":user.username,
            "email":user.email
        })

    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUser(request):

    return Response({
        "username": request.user.username,
        "is_staff": request.user.is_staff
    })






#send msg api


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sendMessage(request):

    receiver_username = request.data.get('receiver')

    try:

        receiver = User.objects.get(
            username=receiver_username
        )

    except User.DoesNotExist:

        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    message = Message.objects.create(

        sender=request.user,

        receiver=receiver,

        subject=request.data.get(
            'subject'
        ),

        message=request.data.get(
            'message'
        ),

        attachment=request.FILES.get(
            'attachment'
        ),

        is_complaint=(
            request.data.get('message_type')
            == 'Complaint'
        )

    )

    serializer = MessageSerializer(
        message
    )

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED
    )







# Inbox API
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def inboxMessages(request):

    cutoff_time = timezone.now() - timedelta(hours=48)

    messages = Message.objects.filter(
        receiver=request.user,
        created_at__gte=cutoff_time
    ).order_by('-created_at')

    # Mark visible inbox messages as read
    messages.update(
        is_read=True
    )

    serializer = MessageSerializer(
        messages,
        many=True
    )

    return Response(
        serializer.data
    )



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unreadMessageCount(request):

    count = Message.objects.filter(
        receiver=request.user,
        is_read=False
    ).count()

    return Response({
        "count": count
    })







#notifications api
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unreadCount(request):

    count = Message.objects.filter(
        receiver=request.user,
        is_read=False
    ).count()

    return Response(
        {
            "count": count
        }
    )






@api_view(['GET'])
@permission_classes([IsAuthenticated])
def archiveMessages(request):

    messages = Message.objects.all().order_by(
        '-created_at'
    )

    serializer = MessageSerializer(
        messages,
        many=True
    )

    return Response(
        serializer.data
    )



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteArchiveMessage(request,id):

    try:

        message = Message.objects.get(
            id=id
        )

        message.delete()

        return Response(
            {"message":"Deleted Successfully"}
        )

    except Message.DoesNotExist:

        return Response(
            {"error":"Message Not Found"},
            status=status.HTTP_404_NOT_FOUND
        )
    








@api_view(['POST'])
@permission_classes([IsAuthenticated])
def claimFoundItem(request, id):

    item = get_object_or_404(
        FoundItem,
        id=id
    )

    if item.status != 'Available':

        return Response(
            {"error": "Item already claimed"},
            status=status.HTTP_400_BAD_REQUEST
        )

    item.claimant = request.user

    item.status = 'Claim Pending'

    item.claim_accepted = False

    item.save()

    return Response({
        "message": "Claim submitted"
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def acceptClaim(request, id):

    item = get_object_or_404(
        FoundItem,
        id=id
    )

    if item.user != request.user:

        return Response(
            {"error": "Not your item"},
            status=status.HTTP_403_FORBIDDEN
        )

    item.claim_accepted = True

    item.save()

    return Response({
        "message": "Claim accepted"
    })






@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rejectClaim(request, id):

    item = get_object_or_404(
        FoundItem,
        id=id
    )

    if item.user != request.user:

        return Response(
            {"error": "Not your item"},
            status=status.HTTP_403_FORBIDDEN
        )

    item.claimant = None

    item.claim_accepted = False

    item.status = 'Available'

    item.save()

    return Response({
        "message": "Claim rejected"
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def resolveClaim(request, id):

    item = get_object_or_404(
        FoundItem,
        id=id
    )

    if item.user != request.user:

        return Response(
            {"error": "Not your item"},
            status=status.HTTP_403_FORBIDDEN
        )

    item.status = 'Resolved'

    item.save()

    return Response({
        "message": "Item resolved"
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def manualFoundItems(request):

    items = FoundItem.objects.exclude(
        status='Resolved'
    ).order_by('-id')

    serializer = FoundItemSerializer(
        items,
        many=True
    )

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def foundItemDetails(request,id):

    try:

        item = FoundItem.objects.get(
            id=id
        )

    except FoundItem.DoesNotExist:

        return Response(
            {"error":"Not Found"},
            status=404
        )

    serializer = FoundItemSerializer(item)

    return Response(serializer.data)












@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resolvedFoundItems(request):

    if not request.user.is_staff:

        return Response(
            {"error": "Unauthorized"},
            status=status.HTTP_403_FORBIDDEN
        )

    items = FoundItem.objects.filter(
        status='Resolved'
    ).order_by('-id')

    serializer = FoundItemSerializer(
        items,
        many=True
    )

    return Response(serializer.data)














@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resolvedFoundItemDetails(request,id):

    if not request.user.is_staff:

        return Response(
            {"error":"Unauthorized"},
            status=status.HTTP_403_FORBIDDEN
        )

    try:

        item = FoundItem.objects.get(
            id=id,
            status='Resolved'
        )

    except FoundItem.DoesNotExist:

        return Response(
            {"error":"Not Found"},
            status=404
        )

    serializer = FoundItemSerializer(item)

    return Response(serializer.data)












# ============================
# Admin Resolved Items
# ============================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def adminResolvedItems(request):

    if not request.user.is_staff:

        return Response(
            {"error":"Unauthorized"},
            status=403
        )

    items = FoundItem.objects.filter(
        status='Resolved'
    ).order_by('-id')

    serializer = FoundItemSerializer(
        items,
        many=True
    )

    return Response(serializer.data)










# ============================
# Admin Resolved Item Details
# ============================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def adminResolvedItemDetails(request,id):

    if not request.user.is_staff:

        return Response(
            {"error":"Unauthorized"},
            status=403
        )

    item = get_object_or_404(
        FoundItem,
        id=id
    )

    serializer = FoundItemSerializer(item)

    return Response(serializer.data)