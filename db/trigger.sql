-- This trigger done with the help and guidance of Vito
-- the goal is to increase the vomit_amt everytime someone clicks on button to regurgitate something
-- in burgertown app

CREATE DEFINER=`root`@`localhost` TRIGGER `burgers_BEFORE_UPDATE` BEFORE UPDATE ON `burgers` FOR EACH ROW BEGIN
IF
old.eaten = 1 AND new.eaten = 0
THEN
SET new.vomit_amt = old.vomit_amt + 1;
END IF;
END