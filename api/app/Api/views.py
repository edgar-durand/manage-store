from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response

from Api.models import Usuarios

@api_view(['POST'])
def login(request):

    username = request.POST.get('username')
    password = request.POST.get('password')

    try:
        user = Usuarios.objects.all(username=username)

    except Exception:
        return Response('Error de user')

    pwd_valid = check_password(password, user.password)
    if not pwd_valid:
        return Response('Contraseña Incorrecta')
    token, _ = Token.objects.get_or_create(user=user)
    print(token.key)
    return Response(token.key)
