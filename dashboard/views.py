from django.shortcuts import render
from django.conf import settings
from django.contrib.auth.decorators import login_required, permission_required

import requests


@login_required
@permission_required('dashboard.index_viewer', raise_exception=True)
def index(request):
    response = requests.get(settings.API_URL)
    posts = response.json()

    # Indicadores principales
    total_responses = len(posts)

    unique_users = len(set(post['userId'] for post in posts))

    average_posts = (
        round(total_responses / unique_users, 1)
        if unique_users
        else 0
    )

    last_post_id = posts[-1]['id'] if posts else 0

    # Primeros registros para mostrar en la tabla
    recent_posts = posts[:10]

    # Cantidad de publicaciones por usuario
    posts_by_user = {}

    for post in posts:
        user_id = post['userId']
        posts_by_user[user_id] = posts_by_user.get(user_id, 0) + 1

    data = {
        'title': "Landing Page' Dashboard",
        'total_responses': total_responses,
        'unique_users': unique_users,
        'average_posts': average_posts,
        'last_post_id': last_post_id,
        'recent_posts': recent_posts,
        'posts_by_user': posts_by_user,
    }

    return render(request, 'dashboard/index.html', data)