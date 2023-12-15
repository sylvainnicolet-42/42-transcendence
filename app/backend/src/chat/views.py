from django.http import JsonResponse

# Create your views here.

def ChatView(request):
    data = {
        "text":"Salut Sylvain, tu es un bon prof",
    };
    return JsonResponse(data);
