  $('#minEksempelForm').validate({
    rules: {
        navn: {
          required: true,
          minlength: 2
        },
        passord: {
          required: true,
          minlength: 8
        },
        epost: {
          required: true,
          email: true
        }
      },
      messages: {
        navn: {
          required: 'Vennligst skriv inn ditt navn',
          minlength: $.validator.format('Minimum {0} bokstaver!')
        },
        passord: {
          required: 'Du må velge et passord',
          minlength: $.validator.format('Minimum {0} tegn eller bokstaver!')
        },
        epost: {
          required: 'Vennligst skriv inn din epost adresse',
          email: 'Ugyldig format'
        }
      },
      highlight: function(element, errorClass) {
        $(element).closest('.form-group').addClass('has-error');
      },
      unhighlight: function(element, errorClass) {
         $(element).closest('.form-group').removeClass('has-error');
      },
      errorPlacement: function(error, element) {
        error.appendTo( element.parent().next() );
      }
  });

  $(':reset').click(function(){
    $('#minEksempelForm').find('.form-group').removeClass('has-error');
    $('#minEksempelForm').find(':input').parent().next().text('').removeClass('error');
  });

  /*Typeahead*/
  var countries = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 10,
    prefetch: {
      // url points to a json file that contains an array of country names, see
      // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
      url: '../data/countries.json',
      // the json file contains an array of strings, but the Bloodhound
      // suggestion engine expects JavaScript objects so this converts all of
      // those strings
      filter: function(list) {
        return $.map(list, function(country) { return { name: country }; });
      }
    }
  });
   
  // kicks off the loading/processing of `local` and `prefetch`
  countries.initialize();
   
  // passing in `null` for the `options` arguments will result in the default
  // options being used
  $('#autoComplete').typeahead(null, {
    name: 'countries',
    displayKey: 'name',
    // `ttAdapter` wraps the suggestion engine in an adapter that
    // is compatible with the typeahead jQuery plugin
    source: countries.ttAdapter()
  });

  $('.typeahead.input-sm').siblings('input.tt-hint').addClass('hint-small');
  $('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');