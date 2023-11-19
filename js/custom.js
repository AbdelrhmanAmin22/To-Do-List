$(document).ready(function(){
    // function to check is empty or not 

    function checkEmpty(){
        if($('.list_item').length > 0){
            $('.emptyMessage').fadeOut();
            $('.selectAll').fadeIn();
            $('.deleteAllSelected').fadeIn();
        }
        else{
            $('.selectAll').fadeOut();
            $('.deleteAllSelected').fadeOut();
            $('.emptyMessage').fadeIn();
        }
    }
    
    checkEmpty();

    // add item to the list 

    $("#addItem").click(function(){
        let userData = $(".input_container input").val();
        if (userData.length != 0){
            $('.items_container').append('<li class="list_item"><input type="checkbox" class="selectDelete"><span class="userInput">' + userData + '</span> <div class="setting"><span class="edit"><i class="fa-regular fa-pen-to-square"></i></span><span class="removeItem"><i class="fa-solid fa-trash-can"></i></span></div></li>');

            checkEmpty();
        }
        else{
            alert("Can not add empty task");
        }

        $('.taskInput').val('');
    });

    // delete item from the list 
    // add event for ***virual*** element select by static element like body

    $('body').on('click', '.removeItem', function(){
        $(this).parents('.list_item').fadeOut(function(){
            $(this).remove();
            checkEmpty();    
        });
        
    });

     // update items 
        $('.items_container').on('click', '.edit', function(){    // one like on but execute only one time
            $(this).parent().fadeOut(); // disappear setting in edit mode
            let oldValue = $(this).parent().siblings('.userInput').html();
            // build input to update the task
            $(this).parent().siblings('.userInput').fadeOut(function(){
                $(this).parent().prepend('<input type="text"class="newInputValue" placeholder="Enter your task"><span class="submitNewInput"><i class="fa-solid fa-right-to-bracket"></i></span>')
                // pass old value for input update
                $(this).parent().children('.newInputValue').val(oldValue);
                $(this).parent().children('.selectDelete').fadeOut(); // remove checkbox when update
            });
        });

        $('.items_container').on('click', '.submitNewInput', function(){

            let newInputOfUser = $(this).siblings('.newInputValue').val();
            $(this).siblings('.userInput').html(newInputOfUser);
            $(this).siblings('.newInputValue').fadeOut(function(){
                $(this).siblings('.userInput').fadeIn(); 
                $(this).siblings('.submitNewInput').remove();
                $(this).parent().children('.setting').fadeIn(); // back again to edit mode 
                $(this).parent().children('.selectDelete').fadeIn(); // back again checkbox after update
                $(this).remove(); 
            });
        });

        // delete all selected item
        $('body').on('change', '.selectDelete', function(){
            if ($(this).is(':checked')){
                $(this).parent().addClass('checked');
            } else {
                $(this).parent().removeClass('checked');
            }
        });

        $('.deleteAllSelected').click(function(){
            $('.checked').fadeOut(function(){
                $('input:checkbox').prop('checked', false); // make all checkboxs false
                $(this).remove();
                checkEmpty();
            });
        });

       // Delete all in one time (select all)
        $('.selectAll').change(function(){
            $(' li ').not(':eq(0), :eq(1)').addClass('checked');  
            $('input:checkbox').prop('checked',true);   // make all checkboxs true
            checkEmpty();
        })


});



