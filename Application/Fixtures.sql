

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public.users DISABLE TRIGGER ALL;

INSERT INTO public.users (id, email, password_hash, locked_at, failed_login_attempts) VALUES ('227e9907-1933-4bf5-999f-ffde2324d3da', 'demo@digitallyinduced.com', 'sha256|17|sBeOZCS65nv+6/bW527QSg==|9u3GHXbP3ONlj6/5V3pqApr9Hv+n6/J5bLJWEOoWwSk=', NULL, 0);


ALTER TABLE public.users ENABLE TRIGGER ALL;


ALTER TABLE public.tasks DISABLE TRIGGER ALL;

INSERT INTO public.tasks (id, title, is_completed, created_at, user_id) VALUES ('459db4de-cff8-4bc9-aa94-a3c26565b2b4', 'test', false, '2021-10-03 17:27:51.100077+02', '227e9907-1933-4bf5-999f-ffde2324d3da');
INSERT INTO public.tasks (id, title, is_completed, created_at, user_id) VALUES ('75d99dd1-4ac6-4de4-8c1c-70afdcaa9659', 'test', true, '2021-10-03 17:30:37.782909+02', '227e9907-1933-4bf5-999f-ffde2324d3da');


ALTER TABLE public.tasks ENABLE TRIGGER ALL;




GRANT USAGE ON SCHEMA public TO api;
GRANT ALL ON SCHEMA public TO api;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO api;