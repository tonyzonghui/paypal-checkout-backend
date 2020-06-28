# Paypal-checkout-backend

---

This application is built with [Sails framework](https://sailsjs.com).
The application provided APIs for paypal checkout using Paypal Order APIs.

### Development Instruction

**App Structure**

```
- api: api definition folder
    - controllers: api request handler
    - models: entity model definition. Used with ORM to handle data persistence.
    - services: business logics
    - helpers: helper functions. See Sails documentation for more detail
    - common: reusable functions or components
    - policies: Policies in Sails are versatile tools for authorization and access control
- config
    - env: configurations for different environments (development, production, etc.)
    - locales: localization files
    * routes.js: api routes definitions
    * datastores.js: database configuration
    * i18n.js: internationalization configuration
    * security.js: security configurations like cors, csrf
    ...
```

**Run Application**

```
# install sails
npm install sails -g
# run app
sails lift
```

**Create New Api**

```
sails generate api [api_name]
```

This will generate a model and a controller for [api_name]

### APIs

Currently there are 2 APIs provided by this backend service:
| method | path | description |
| ---- | ---- | ---- |
| POST | /checkout-paypal | create order |
| POST | /create-payment" | capture order payments |

### Links

- [Sails framework documentation](https://sailsjs.com/get-started)
- [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
- [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
- [Community support options](https://sailsjs.com/support)
- [Professional / enterprise options](https://sailsjs.com/enterprise)

### Version info

This app was originally generated on Sat Jun 27 2020 21:41:33 GMT+0800 (Singapore Standard Time) using Sails v1.2.4.
