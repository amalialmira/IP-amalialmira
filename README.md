# IP-HCK73

Endpoints
1. Get Books
&* URL: /books
&* Method: GET
&* Description: Retrieve a list of books
&* Authentication: Required
&* Response (200 & OK)*
```json
[
{
"id": "number",
"title": "string",
"author": "string",
"description": "string",
"coverImage": "string",
"createdAt": "date",
"updatedAt": "date"
}
]
```
2. User Login
&* URL: /login
&* Method: POST
&* Description: Authenticate a user
&* Request Body:
```json
{
"email": "string",
"password": "string"
}
```
&* Response (200 & OK)*
```json
{
"access_token": "string"
}
```
3. User Registration
&* URL: /register
&* Method: POST
&* Description: Register a new user
&* Request Body:
```json
{
"username": "string",
"email": "string",
"password": "string"
}
```
&* Response (201 & Created)*
```json
{
"id": "number",
"username": "string",
"email": "string"
}
```
4. Get Recommendations
&* URL: /getreccomendation
&* Method: POST
&* Description: Get book recommendations based on mood
&* Authentication: Required
&* Request Body:
```json
{
"mood": "string"
}
```
&* Response (200 & OK)*
```json
[
{
"id": "number",
"title": "string",
"author": "string",
"description": "string",
"coverImage": "string"
}
]
```
5. Get User's Reading List
&* URL: /myreadlist
&* Method: GET
&* Description: Retrieve the user's reading list
&* Authentication: Required
&* Response (200 & OK)*
```json
[
{
"id": "number",
"BookId": "number",
"UserId": "number",
"status": "string",
"notes": "string",
"createdAt": "date",
"updatedAt": "date",
"Book": {
"id": "number",
"title": "string",
"author": "string",
"description": "string",
"coverImage": "string"
}
}
]
```
6. Get Specific Book from Reading List
&* URL: /myreadlist/:id
&* Method: GET
&* Description: Retrieve a specific book from the user's reading list
&* Authentication: Required
&* Parameters: id [number] &* Reading list item ID
&* Response (200 & OK)*
```json
{
"id": "number",
"BookId": "number",
"UserId": "number",
"status": "string",
"notes": "string",
"createdAt": "date",
"updatedAt": "date",
"Book": {
"id": "number",
"title": "string",
"author": "string",
"description": "string",
"coverImage": "string"
}
}
```
7. Delete Book from Reading List
&* URL: /myreadlist/delete/:id
&* Method: DELETE
&* Description: Remove a book from the user's reading list
&* Authentication: Required
&* Parameters: id [number] &* Reading list item ID
&* Response (200 & OK)*
```json
{
"message": "Book successfully removed from reading list"
}
```
8. Add Book to Reading List
&* URL: /myreadlist
&* Method: POST
&* Description: Add a book to the user's reading list
&* Authentication: Required
&* Request Body:
```json
{
"BookId": "number"
}
```
&* Response (201 & Created)*
```json
{
"id": "number",
"BookId": "number",
"UserId": "number",
"status": "string",
"notes": "string",
"createdAt": "date",
"updatedAt": "date"
}
```
9. Edit Reading List Item
&* URL: /myreadlist/edit/:id
&* Method: PUT
&* Description: Update details of a book in the user's reading list
&* Authentication: Required
&* Parameters: id [number] &* Reading list item ID
&* Request Body:
```json
{
"status": "string",
"notes": "string"
}
```
&* Response (200 & OK)*
```json
{
"message": "Reading list item updated successfully"
}
```
Error Responses
&* Response (400 & Bad Request)*
```json
{
"message": "Validation error message"
}
```
&* Response (401 & Unauthorized)*
```json
{
"message": "Invalid credentials"
}
```
&* Response (403 & Forbidden)*
```json
{
"message": "Access denied"
}
```
&* Response (404 & Not Found)*
```json
{
"message": "Resource not found"
}
```
&* Response (500 & Internal Server Error)*
```json
{
"message": "Internal server error"
}
```