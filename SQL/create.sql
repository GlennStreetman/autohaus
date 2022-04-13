create TABLE servicerequests (
    id serial NOT NULL,
    firstName text NOT NULL,
    lastName text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    prefDate text NOT NULL,
    prefTime text NOT NULL,
    altDate text NOT NULL,
    altTime text NOT NULL,
    make text NOT NULL,
    model text NOT NULL,
    modelyear text NOT NULL,
    reason text NOT NULL,
    requestDate timestamp DEFAULT now()
)