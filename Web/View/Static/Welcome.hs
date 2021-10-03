module Web.View.Static.Welcome where
import Web.View.Prelude

data WelcomeView = WelcomeView

instance View WelcomeView where
    html WelcomeView = [hsx|
        <div id="todo-manager"/>

        <script src={assetPath "/vendor/jquery-3.6.0.slim.min.js"}></script>
        <script src={assetPath "/vendor/bootstrap.min.js"}></script>

        <script src={assetPath "/ihp-auth.js"}></script>
        <script src={assetPath "/vendor/ihp-datasync.js"}></script>
        <script src={assetPath "/vendor/ihp-querybuilder.js"}></script>
        <script src={assetPath "/app.js"}></script>



    |]