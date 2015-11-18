(function() {
  var ScopeNameProvider;

  ScopeNameProvider = require('../lib/scope-name-provider');

  describe('ScopeNameProvider', function() {
    var snp;
    snp = [][0];
    beforeEach(function() {
      snp = new ScopeNameProvider();
      return this.addMatchers({
        toEqualNull: function() {
          return this.actual == null;
        }
      });
    });
    describe('scope provision', function() {
      it('provides scope name based on file extension', function() {
        snp.registerExtension('blah', 'text.plain.test-grammar');
        return expect(snp.getScopeName('hogehoge.blah')).toBe('text.plain.test-grammar');
      });
      it('provides scope name based on regexp matcher', function() {
        snp.registerMatcher('spec\.coffee$', 'test.coffee.spec');
        return expect(snp.getScopeName('super-human-spec.coffee')).toBe('test.coffee.spec');
      });
      it('gives precedence to file extension above regexp matchers', function() {
        snp.registerExtension('blah', 'text.plain.test-grammar');
        snp.registerMatcher('spec\.blah$', 'test.blah.spec');
        return expect(snp.getScopeName('super-human-spec.blah')).toBe('text.plain.test-grammar');
      });
      return describe('regexp matcher', function() {
        it('can match start-of-string', function() {
          snp.registerMatcher('^spec', 'test.spec');
          expect(snp.getScopeName('spec-super-human.coffee')).toBe('test.spec');
          return expect(snp.getScopeName('super-human-spec.coffee')).toEqualNull();
        });
        it('can match mid-string', function() {
          snp.registerMatcher('sp.c', 'test.spec');
          expect(snp.getScopeName('spec-super-human.coffee')).toBe('test.spec');
          expect(snp.getScopeName('super-human-spec.coffee')).toBe('test.spec');
          return expect(snp.getScopeName('super-human-spock.coffee')).toBe('test.spec');
        });
        return it('can match end-of-string', function() {
          snp.registerMatcher('spec$', 'test.spec');
          expect(snp.getScopeName('spec-super-human')).toEqualNull();
          return expect(snp.getScopeName('super-human-spec')).toBe('test.spec');
        });
      });
    });
    return describe('registered scope name list provision', function() {
      it('initially has no scope names', function() {
        return expect(snp.getScopeNames()).toEqual([]);
      });
      it('updates the list as grammars are added', function() {
        snp.registerExtension('blah', 'text.plain.test-grammar');
        expect(snp.getScopeNames()).toEqual(['text.plain.test-grammar']);
        snp.registerExtension('hogehoge', 'text.plain.null-grammar');
        return expect(snp.getScopeNames()).toEqual(['text.plain.test-grammar', 'text.plain.null-grammar']);
      });
      return it('provides a list of unique grammars', function() {
        snp.registerExtension('blah', 'text.plain.test-grammar');
        expect(snp.getScopeNames()).toEqual(['text.plain.test-grammar']);
        snp.registerExtension('blah', 'text.plain.test-grammar');
        return expect(snp.getScopeNames()).toEqual(['text.plain.test-grammar']);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY20vLmF0b20vcGFja2FnZXMvZmlsZS10eXBlcy9zcGVjL3Njb3BlLW5hbWUtcHJvdmlkZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUJBQUE7O0FBQUEsRUFBQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsNEJBQVIsQ0FBcEIsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxtQkFBVCxFQUE4QixTQUFBLEdBQUE7QUFDNUIsUUFBQSxHQUFBO0FBQUEsSUFBQyxNQUFPLEtBQVIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsR0FBQSxHQUFVLElBQUEsaUJBQUEsQ0FBQSxDQUFWLENBQUE7YUFDQSxJQUFDLENBQUEsV0FBRCxDQUNFO0FBQUEsUUFBQSxXQUFBLEVBQWEsU0FBQSxHQUFBO2lCQUFHLG9CQUFIO1FBQUEsQ0FBYjtPQURGLEVBRlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBT0EsUUFBQSxDQUFTLGlCQUFULEVBQTRCLFNBQUEsR0FBQTtBQUMxQixNQUFBLEVBQUEsQ0FBRyw2Q0FBSCxFQUFrRCxTQUFBLEdBQUE7QUFDaEQsUUFBQSxHQUFHLENBQUMsaUJBQUosQ0FBc0IsTUFBdEIsRUFBOEIseUJBQTlCLENBQUEsQ0FBQTtlQUNBLE1BQUEsQ0FBTyxHQUFHLENBQUMsWUFBSixDQUFpQixlQUFqQixDQUFQLENBQXdDLENBQUMsSUFBekMsQ0FBOEMseUJBQTlDLEVBRmdEO01BQUEsQ0FBbEQsQ0FBQSxDQUFBO0FBQUEsTUFJQSxFQUFBLENBQUcsNkNBQUgsRUFBa0QsU0FBQSxHQUFBO0FBQ2hELFFBQUEsR0FBRyxDQUFDLGVBQUosQ0FBb0IsZUFBcEIsRUFBcUMsa0JBQXJDLENBQUEsQ0FBQTtlQUNBLE1BQUEsQ0FBTyxHQUFHLENBQUMsWUFBSixDQUFpQix5QkFBakIsQ0FBUCxDQUFrRCxDQUFDLElBQW5ELENBQXdELGtCQUF4RCxFQUZnRDtNQUFBLENBQWxELENBSkEsQ0FBQTtBQUFBLE1BUUEsRUFBQSxDQUFHLDBEQUFILEVBQStELFNBQUEsR0FBQTtBQUM3RCxRQUFBLEdBQUcsQ0FBQyxpQkFBSixDQUFzQixNQUF0QixFQUE4Qix5QkFBOUIsQ0FBQSxDQUFBO0FBQUEsUUFDQSxHQUFHLENBQUMsZUFBSixDQUFvQixhQUFwQixFQUFtQyxnQkFBbkMsQ0FEQSxDQUFBO2VBRUEsTUFBQSxDQUFPLEdBQUcsQ0FBQyxZQUFKLENBQWlCLHVCQUFqQixDQUFQLENBQWdELENBQUMsSUFBakQsQ0FBc0QseUJBQXRELEVBSDZEO01BQUEsQ0FBL0QsQ0FSQSxDQUFBO2FBYUEsUUFBQSxDQUFTLGdCQUFULEVBQTJCLFNBQUEsR0FBQTtBQUN6QixRQUFBLEVBQUEsQ0FBRywyQkFBSCxFQUFnQyxTQUFBLEdBQUE7QUFDOUIsVUFBQSxHQUFHLENBQUMsZUFBSixDQUFvQixPQUFwQixFQUE2QixXQUE3QixDQUFBLENBQUE7QUFBQSxVQUNBLE1BQUEsQ0FBTyxHQUFHLENBQUMsWUFBSixDQUFpQix5QkFBakIsQ0FBUCxDQUFrRCxDQUFDLElBQW5ELENBQXdELFdBQXhELENBREEsQ0FBQTtpQkFFQSxNQUFBLENBQU8sR0FBRyxDQUFDLFlBQUosQ0FBaUIseUJBQWpCLENBQVAsQ0FBa0QsQ0FBQyxXQUFuRCxDQUFBLEVBSDhCO1FBQUEsQ0FBaEMsQ0FBQSxDQUFBO0FBQUEsUUFLQSxFQUFBLENBQUcsc0JBQUgsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLFVBQUEsR0FBRyxDQUFDLGVBQUosQ0FBb0IsTUFBcEIsRUFBNEIsV0FBNUIsQ0FBQSxDQUFBO0FBQUEsVUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLFlBQUosQ0FBaUIseUJBQWpCLENBQVAsQ0FBa0QsQ0FBQyxJQUFuRCxDQUF3RCxXQUF4RCxDQURBLENBQUE7QUFBQSxVQUVBLE1BQUEsQ0FBTyxHQUFHLENBQUMsWUFBSixDQUFpQix5QkFBakIsQ0FBUCxDQUFrRCxDQUFDLElBQW5ELENBQXdELFdBQXhELENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8sR0FBRyxDQUFDLFlBQUosQ0FBaUIsMEJBQWpCLENBQVAsQ0FBbUQsQ0FBQyxJQUFwRCxDQUF5RCxXQUF6RCxFQUp5QjtRQUFBLENBQTNCLENBTEEsQ0FBQTtlQVdBLEVBQUEsQ0FBRyx5QkFBSCxFQUE4QixTQUFBLEdBQUE7QUFDNUIsVUFBQSxHQUFHLENBQUMsZUFBSixDQUFvQixPQUFwQixFQUE2QixXQUE3QixDQUFBLENBQUE7QUFBQSxVQUNBLE1BQUEsQ0FBTyxHQUFHLENBQUMsWUFBSixDQUFpQixrQkFBakIsQ0FBUCxDQUEyQyxDQUFDLFdBQTVDLENBQUEsQ0FEQSxDQUFBO2lCQUVBLE1BQUEsQ0FBTyxHQUFHLENBQUMsWUFBSixDQUFpQixrQkFBakIsQ0FBUCxDQUEyQyxDQUFDLElBQTVDLENBQWlELFdBQWpELEVBSDRCO1FBQUEsQ0FBOUIsRUFaeUI7TUFBQSxDQUEzQixFQWQwQjtJQUFBLENBQTVCLENBUEEsQ0FBQTtXQXNDQSxRQUFBLENBQVMsc0NBQVQsRUFBaUQsU0FBQSxHQUFBO0FBQy9DLE1BQUEsRUFBQSxDQUFHLDhCQUFILEVBQW1DLFNBQUEsR0FBQTtlQUNqQyxNQUFBLENBQU8sR0FBRyxDQUFDLGFBQUosQ0FBQSxDQUFQLENBQTJCLENBQUMsT0FBNUIsQ0FBb0MsRUFBcEMsRUFEaUM7TUFBQSxDQUFuQyxDQUFBLENBQUE7QUFBQSxNQUdBLEVBQUEsQ0FBRyx3Q0FBSCxFQUE2QyxTQUFBLEdBQUE7QUFDM0MsUUFBQSxHQUFHLENBQUMsaUJBQUosQ0FBc0IsTUFBdEIsRUFBOEIseUJBQTlCLENBQUEsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxDQUFPLEdBQUcsQ0FBQyxhQUFKLENBQUEsQ0FBUCxDQUEyQixDQUFDLE9BQTVCLENBQW9DLENBQUMseUJBQUQsQ0FBcEMsQ0FEQSxDQUFBO0FBQUEsUUFHQSxHQUFHLENBQUMsaUJBQUosQ0FBc0IsVUFBdEIsRUFBa0MseUJBQWxDLENBSEEsQ0FBQTtlQUlBLE1BQUEsQ0FBTyxHQUFHLENBQUMsYUFBSixDQUFBLENBQVAsQ0FBMkIsQ0FBQyxPQUE1QixDQUFvQyxDQUFDLHlCQUFELEVBQTRCLHlCQUE1QixDQUFwQyxFQUwyQztNQUFBLENBQTdDLENBSEEsQ0FBQTthQVVBLEVBQUEsQ0FBRyxvQ0FBSCxFQUF5QyxTQUFBLEdBQUE7QUFDdkMsUUFBQSxHQUFHLENBQUMsaUJBQUosQ0FBc0IsTUFBdEIsRUFBOEIseUJBQTlCLENBQUEsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxDQUFPLEdBQUcsQ0FBQyxhQUFKLENBQUEsQ0FBUCxDQUEyQixDQUFDLE9BQTVCLENBQW9DLENBQUMseUJBQUQsQ0FBcEMsQ0FEQSxDQUFBO0FBQUEsUUFHQSxHQUFHLENBQUMsaUJBQUosQ0FBc0IsTUFBdEIsRUFBOEIseUJBQTlCLENBSEEsQ0FBQTtlQUlBLE1BQUEsQ0FBTyxHQUFHLENBQUMsYUFBSixDQUFBLENBQVAsQ0FBMkIsQ0FBQyxPQUE1QixDQUFvQyxDQUFDLHlCQUFELENBQXBDLEVBTHVDO01BQUEsQ0FBekMsRUFYK0M7SUFBQSxDQUFqRCxFQXZDNEI7RUFBQSxDQUE5QixDQUZBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/cm/.atom/packages/file-types/spec/scope-name-provider-spec.coffee
