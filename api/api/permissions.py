from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


def get_object(context):

    if 'kwargs' in context and 'pk' in context['kwargs']:
        pk = context['kwargs']['pk']
        model = context['view'].serializer_class().Meta.model
        obj = model.objects.filter(id=pk)

        if obj.exists():
            obj = obj[0]
            return obj

    return None


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsAdmin(BasePermission):
    message = 'Admins only'

    def has_permission(self, request, view):
        return request.user.is_superuser


class IsAdminOrReadOnly(BasePermission):
    message = 'Must be admin to post'

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or request.user.is_superuser


class IsAdminOrPostOnly(BasePermission):
    message = 'Must be admin to read'

    def has_permission(self, request, view):
        return request.method == 'POST' or request.user.is_superuser


class IsOwner(BasePermission):
    message = 'Must be the owner of this to access'

    def has_permission(self, request, view):
        if request.user.is_superuser or request.method == 'POST':
            return True

        if request.method == 'GET' or request.method == 'PUT' or request.method == 'PATCH' or request.method == 'DELETE':
            obj = get_object(request.parser_context)
            if not obj:
                return False

            if hasattr(obj, 'owner'):
                return obj.owner == request.user
            else:
                return obj.id == request.user.id
        else:
            return False


class IsOwnerOrReadOnly(BasePermission):
    message = 'Must be the owner of this to edit'

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        obj = get_object(request.parser_context)
        if not obj:
            return False

        return obj.owner == request.user


class IsOwnerOrPostOnly(BasePermission):
    message = "Must be logged in to create contestant account"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS or request.method == 'POST':
            return True

        obj = get_object(request.parser_context)
        if not obj:
            return False

        return obj.owner == request.user


class BlacklistPermission(BasePermission):

    def has_permission(self, request, view):
        ip_addr = request.META['REMOTE_ADDR']
        blacklisted = False  # Blacklist.objects.filter(ip_addr=ip_addr).exists() # true / false
        return not blacklisted
