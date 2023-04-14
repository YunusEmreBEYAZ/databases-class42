## 1 What columns violate 1NF?

        We have 5 rules for 1NF and they are;
        1. Single valued columns (each column should have atomic value, no multiple values)
        2. Column domain (for any column) should not change.
        3. Unique names for columns.
        4. Order (of rows/columns) does not matter.
        5. No duplicate records (every record has a primary key).

Acoordoing to this rules if we check our table first of all member_address column violates 1NF. Because in that column records are used with numbers and Strings. It violates the 1NF. It should be all numbers or strings and we need to separate them.

And second violation is at the dinner_date column. It is giving us the date data but they are not all in same logic. So it will be hard to get the data from that column. All should be same logic like YYYY/MM/DD. We need fo fix it.

And another violating is at the food_code and food_description columns. They are containing multiple values an this is violating atomicity requirement. Every column should contain only 1 value. We need to fix it by using foreign key. Besides they are representing same things. food_code is representing food_description. We don't need them together. We can use food_description with another table and connect them with foreign key. And same problem occuring with the vennue_code and vennue_desription.

## 2 What entities do you recognize that could be extracted?

venue_code and venue_description is representing same thing and
food_code and food_description is representing same thing we can exract venue_description and food_descriptiion.

## 3- Name all the tables and columns that would make a 3NF compliant solution

    We should make 5 different tables;

    1- members
        -member_id (PK)
        -member_name
        -member_address_id (FK to memberAddress table)


    2- dinner
        -dinner_id (PK)
        -member_id (FK to members table)
        -dinner_date
        -venue_code (FK to venue table)

    3- orders
        -order_id (PK)
        -dinner_id (FK to dinner table)
        -food_code(FK to foods table)

    3- venue
        -venue_code (PK)
        -venue_description

    4- foods
        -food_code (PK)
        -food_description

    5- memberAddress
        -member_id (PK)(FK to members table)
        -street
        -door_number
        -region

i have added orders table for if one dinner more than 1 food_code. we can connect them now
