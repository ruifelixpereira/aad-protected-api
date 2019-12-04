# Intro

We are exposing a server application that exposes a REST API to be invoked by client applications.

Client App ----> Server API App

To avoid that anyone can call this API, we want to authenticate and authorize which client applications are allowed to do it.

Since we are going to deploy the Server API App in Azure Web Service, we configure Azure Web service to always authenticate who calls the Server API App (using Azure Active Directory) and in the Server API App we only need to validate the token and additional authorization validations.
