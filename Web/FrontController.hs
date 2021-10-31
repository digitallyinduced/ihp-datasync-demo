module Web.FrontController where

import IHP.RouterPrelude
import Web.Controller.Prelude
import Web.View.Layout (defaultLayout)

-- Controller Imports
import Web.Controller.Static

-- Login
import IHP.LoginSupport.Middleware
import Web.Controller.Sessions
import Web.Controller.Users
import Web.Controller.User

-- DataSync
import IHP.DataSync.Types
import IHP.DataSync.Controller
import IHP.DataSync.REST.Types
import IHP.DataSync.REST.Controller

import qualified IHP.DataSync.Role as Role

instance FrontController WebApplication where
    controllers = 
        [ startPage WelcomeAction
        
        
        , parseRoute @UserController

        -- DataSync
        , webSocketApp @DataSyncController
        , parseRoute @ApiController
        
        , parseRoute @SessionsController
        , parseRoute @UsersController
        
        -- Generator Marker
        ]

instance InitControllerContext WebApplication where
    initContext = do
        setLayout defaultLayout
        initAutoRefresh
        initAuthentication @User
        Role.ensureAuthenticatedRoleExists