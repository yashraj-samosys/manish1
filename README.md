# Refferal
User Type
 1 Default Agent = ignore user_type in agent table
                 = if active_status = 1 and status = 1

2 partner Agent = ignore user_type in agent table
                 = if active_status = 0 and status = 1
            
3 Client Agent =  user_type =2 and is_default_agent=0 in agent table
                 = if active_status  = 0 and status = 1

4 Public =  user_type=4 in agent table

                
"# manish1" 
