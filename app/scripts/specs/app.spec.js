var React = require('react'),
    TestUtils = require('react/lib/ReactTestUtils');


var App = React.createClass({
  render: function() {
    return (
      <h1>Hello world!</h1>
    );
  }
  
});

describe("Environment", function() {

  it("test data", function() {
    expect(1).toBe(1);
  });

  it("test data failing", function() {
    expect(2).toBe(2);
  });

});

describe('App', function() {
  
  it("should render text: Hello world!", function() {
    var app = TestUtils.renderIntoDocument(App());
    expect(app.getDOMNode().textContent).toEqual('Hello world!');
  });

});