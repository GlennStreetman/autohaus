CREATE TABLE servicerequests (
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

CREATE TABLE holidays (
     id serial NOT NULL,
     targetdate date NOT NULL,
     holiday text NOT NULL,
     daysclosed text NOT NULL
)

-- mock holidays
INSERT INTO holidays (targetdate, holiday, daysclosed)
    VALUES ('2022-01-01', 'New Years Day', '1'),
     ('2022-02-024', 'Valendtines Day', '1'),   
     ('2022-03-17', 'St. Patricks Day', '1'),
     ('2022-04-17', 'Easter', '1'),
     ('2022-05-08', 'Mothers Day', '1'),
     ('2022-07-04', 'Independence Day', '1'),
     ('2022-11-11', 'Veterans Day', '1'),
     ('2022-12-24', 'Christmas Eve', '1'),
     ('2022-12-25', 'Christmas Day', '1')

