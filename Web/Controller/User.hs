module Web.Controller.User where

import Web.Controller.Prelude
import Data.Aeson.TH
import Data.Aeson

instance Controller UserController where
    action UserAction = case currentUserOrNothing of
        Just user -> renderJson user
        Nothing -> renderJson Null

instance ToJSON User where
    toJSON user = object
        [ "id" .= get #id user
        , "email" .= get #email user
        ]
