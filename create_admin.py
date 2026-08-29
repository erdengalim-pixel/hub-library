from getpass import getpass

from app.services.users import create_admin


username = input("Admin username: ")
first_name = input("First name: ")
last_name = input("Last name: ")
password = getpass("Admin password: ")
password_confirm = getpass("Confirm password: ")

if password != password_confirm:
    print("Passwords do not match")
    raise SystemExit(1)

try:
    user = create_admin(username, first_name, last_name, password)
    print(
        f"Admin '{user.username}' "
        f"({user.first_name} {user.last_name}) "
        f"created successfully"
    )
except ValueError as error:
    print(f"Error: {error}")
