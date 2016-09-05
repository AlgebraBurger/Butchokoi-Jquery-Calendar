$(document).ready(function(){

  var events = [
    { date:1, name:"Event 1 a"},
    { date:1, name:"Event 1 b"},
    { date:2, name:"Event 2"},
    { date:3, name:"Event 3"},
  ];

  var today = new Date();
  var mm = today.getMonth();
  var dd = today.getDate();
  var yyyy = today.getFullYear();
  renderCalendar(mm,yyyy);

  $('.mbn-cal-prev').click(function(){
        mm--;
        if(mm<0){
           mm=11;
           yyyy--;
        }
        renderCalendar(mm,yyyy);
  });

  $('.mbn-cal-next').click(function(){
         mm++;         
         if(mm>11){
           mm=0;
           yyyy++;
         }
         renderCalendar(mm,yyyy);
  });

   function renderCalendar(mm,yyyy){
     console.log(mm);
      $('.appointment-calendar').find('tbody').html('');

      var tbody = '';
      var monthStart = new Date(yyyy, mm, 1);
      var monthEnd = new Date(yyyy, mm + 1, 0);
      var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)

      var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      $('.calendarmonth').html(month[mm] + "," + yyyy);

      var mmStart = new Date(yyyy, mm, 1);
      var mmEnd = new Date(yyyy, mm + 1, 0);
        
      var s = mmStart.getDate();
      var e = mmEnd.getDate();

      
      var weekCounter = 1;
      var weeks = '';
      var days = '';

      // previous month    
      var prevEnd = new Date(yyyy, mm + 1-1, 0);
      var prevStart = prevEnd.getDate() - monthStart.getDay() + 1;
      
      
      
      for(var i = 1;i<=monthStart.getDay();i++){
          days += '<td><span style="color:gray;">' + prevStart + '</span></td>';
          prevStart++;
          weekCounter++;
      }

      for(var i=s;i<=e;i++){       
          var day = '<div>' + i + '</div>';
          for(var event of events){
              if(event.date == i){
                  day += '<div style="background-color:purple; margin-bottom:5px; color:white;">' + event.name + '</div>';
              }
          }

          

          if(today.getDate()==i && today.getFullYear()==yyyy && mm == today.getMonth()){
            days += '<td style="background-color:green; color:white;">' + day + '</td>';
          }else{
            days += '<td>' + day + '</td>';
          }
          
          weekCounter++;
          if(weekCounter>7){
            weeks += '<tr>'+days+'</tr>';
            days = '';
            weekCounter = 1;
          }       
      } 

      var remaining = 7 - (weekCounter);  
      for(var i = 0; i<=remaining;i++){
            days += '<td><span style="color:gray;">' + (i+1) + '</span></td>';              
      }
      weeks += '<tr>'+days+'</tr>';
      
      $('.appointment-calendar').find('tbody').append(weeks);

   }


});

