/* eslint-disable no-undef */
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() { // first test suit
        
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() { // 1st spec
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined and not empty', function(){ // 2nd spec
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.constructor).toBe(String);
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined and not empty', function(){ //3rd spec
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined(); 
                expect(feed.name.constructor).toBe(String);
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){ //second test suit

        let hiddenMenu;
        
        beforeEach(function(){
            hiddenMenu = document.body.classList.contains('menu-hidden');
        });
        
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function(){ //4th spec
            expect(hiddenMenu).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('changes visibility when the menu icon is clicked',function(){//5th spec
            let menuIcon = document.querySelector('a.menu-icon-link');

            //trigger the menu icon for the first time
            menuIcon.click();
            //check if initial status for the hidden menu is false which will allow the menu to show up
            expect(hiddenMenu).toBe(true);

            //trigger the menu icon again to hide it
            menuIcon.click();
            //after clicking the menu icon, the status for the hidden menu should be true which will hide the menu again  
            expect(hiddenMenu).toBe(true);

         });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){ // third test suit

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //loadFeed function is called and completes its work
        beforeEach(function(done){
            //loadFeed has two parameters. the first it index id and the second is the call back action
            loadFeed(1,done);
        });

        it('there is at least a single entry element within the feed container', function(){ //6th spec
            //this query wss tested in the DOM to make sure it returns the right information
            let entryElements = document.querySelector("div.feed");
            expect(entryElements.children.length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){ //fourth test suit
        
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let firstFeed, lastFeed;

        beforeEach(function(done){
            //loadFeed has two parameters. the first it index id and the second is the call back action
            //0 indicates the first index id
            loadFeed(0, function(){
                //this query was tested in the DOM to make sure it returns the right information
                firstFeed = document.querySelector("div.feed").innerHTML;
                loadFeed(1, function(){
                    lastFeed = document.querySelector("div.feed").innerHTML;
                    done();
                });
            });
        });

        it('the content actually changes', function () { //7th spec
            expect(firstFeed).not.toBe(lastFeed);
        });
    });

}());
