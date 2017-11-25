<html><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="../style/index.css" rel="stylesheet" type="text/css">

  </head>
  <body>
    <div class="section">
      <div class="col-md-12 text-right">
        <a href="./basic user register.html" class="btn btn-lg btn-primary"><i class="fa fa-fw fa-lg fa-laptop" style="margin-right:5px"></i>Advanced Users</a>
        <a href="#openModal" class="btn btn-lg btn-primary" style="margin-left: 10px"><i class="fa fa-bar-chart fa-fw fa-lg" style="margin-right:5px"></i>Administrators</a>
        <div class="modalDialog" id="openModal">
          <div>
            <a href="#close" title="Close" class="close">X</a>
            <h2>Administration Log-In</h2>
            <form name="f" action="/login" method="post">
                    <fieldset>
                        <legend>Please Login</legend>
                        <c:if test="${param.error ne null}">
                            <div>
                                Invalid username or password.
                            </div>
                        </c:if>
                        <c:if test="${param.logout ne null}">
                            <div>
                                You have logged out.
                            </div>
                        </c:if>
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username"/>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password"/>
                        <div>
                            <button type="submit" class="btn btn-lg btn-primary" data-toggle="modal"  style="margin-right:5px">Log in</button>
                        </div>
                    </fieldset>
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                </form>
            <br>
            <a class="btn btn-lg btn-primary" data-toggle="modal" href="./basic user.html"><i class="fa fa-fw fa-lg fa-laptop" style="margin-right:5px"></i>Log In</a>
            <a href="#close" title="Close" class="close">
              
                 </a>
            <a class="btn btn-lg btn-primary" data-toggle="modal"><i class="fa fa-fw fa-lg fa-laptop" style="margin-right:5px"></i>Cancel</a>
          </div>
        </div>
        <div class="section">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <ul class="nav nav-pills"></ul>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="container">
                  <div class="row">
                    <div class="col-md-12">
                      <ul class="nav nav-tabs">
                        <li class="active"></li>
                        <li class="active">
                          <a href="./basic user.html"><i class="fa fa-fw fa-angle-double-right"></i>Home</a>
                        </li>
                        <li>
                          <a href="./analyze.html">Analyze a State</a>
                        </li>
                        
                        <li class="dropdown">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Learn More&nbsp;<i class="fa fa-caret-down"></i></a>
                          <ul class="dropdown-menu" role="menu">
                            <li>
                              <a href="./learn_home.html">Home Page</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                              <a href="./learn_tests.html">How Tests Work</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                              <a href="./learn_legal.html">Legal Efforts </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="./contact.html">Contact</a>
                        </li>
                        <li>
                          <a href="./whatif.html">What If?</a>
                        </li>
                      </ul>
                      <a href="#"><i class="fa fa-fw fa-lg fa-toggle-off pull-left"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div id="carousel-example" data-interval="false" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel slide" id="carousel-example" data-interval="false" data-ride="carousel">
                      <div class="carousel-inner">
                        <div class="item active">
                          <img src="../img/welcome.jpg">
                          <div class="carousel-caption">
                            <h2>Gerrymandering of the United States</h2>
                          </div>
                        </div>
                      </div>
                      <a class="left carousel-control" href="#carousel-example" data-slide="prev"><i class="icon-prev  fa fa-angle-left"></i></a>
                      <a class="right carousel-control" href="#carousel-example" data-slide="next"><i class="icon-next fa fa-angle-right"></i></a>
                    </div>
                  </div>
                  <a class="left carousel-control" href="#carousel-example" data-slide="prev"><i class="icon-prev  fa fa-angle-left"></i></a>
                  <a class="right carousel-control" href="#carousel-example" data-slide="next"><i class="icon-next fa fa-angle-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <h3 class="text-center text-primary">Effects of Gerrymandering</h3>
                  <h3></h3>
                  <hr>
                  <p class="text-left">&nbsp;Efficiency gap and partisan bias are not identical for all. This
                    is because whenever an election does not produce a tie, the parties’ actual
                    vote shares in each district must be shifted in order to calculate partisan
                    bias. Typically these vote shares are shifted so as to mimic a tied election,
                    though sometimes they are shifted to mimic the flipping of the parties’
                    statewide performances. It causes partisan bias to diverge from the efficiency
                    gap, which is computed using the observed election results. The the parties’
                    wasted votes in the actual election are crucial input for this.&nbsp;</p>
                  <a class="btn btn-primary" href="./learn_home.html">Read More</a>
                </div>
                <div class="col-md-4">
                  <h3 class="text-center text-primary">Three Tests of Gerrymandering</h3>
                  <h3></h3>
                  <hr>
                  <p class="text-left">Partisan gerrymandering has a very particular goal: amplify a political
                    party's power far beyond what it deserves based on vote share alone. This
                    process is accomplished by two complementary methods: cracking and packing.
                    "Packing" occurs when as many supporters of the victim party as possible
                    are crammed into a small number of districts, creating a few overwhelming
                    wins for the victim party.
                    <br>The remaining members of the victim party are then "cracked"so that they
                    comprise a large but minority block of voters (typically 40 - 45%).&nbsp;</p>
                  <a class="btn btn-primary" href="./learn_tests.html">Read More</a>
                </div>
                <div class="col-md-4">
                  <h3 class="text-center text-primary">Legal Efforts</h3>
                  <h3></h3>
                  <hr>
                  <p class="text-left">&nbsp;Republicans held sole control over redistricting in Wisconsin in
                    2012, and perpetuated one of the worst partisan gerrymanders to date. A
                    three judge panel ruled that the state was a clear partisan gerrymander
                    in November 2016. The state appealed to the U.S. Supreme Court, which agreed
                    to hear the case. Argument is set for October 3, 2017. This is the first
                    partisan gerrymandering claim to reach the Court in over a decade, and
                    the outcome could shape American politics for decades to come.
                    <br><br/>
                  </p>
                  <a class="btn btn-primary" href="./learn_legal.html">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="section section-primary">
          <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <h1 class="text-left">Gerrymandering of the U.S.</h1>
                <p contenteditable="true" class="text-left">"Gerrymandering is one of the great political curses of our single-member
                  district plurality system and one that can only truly be lifted by adopting
                  proportional representation." &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;--
                  Professor Douglass Amy, Real Choices, New Voices, Columbia University Press,
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;New York, 1993</p>
              </div>
              <div class="col-sm-6">
                <p class="text-info text-right">
                  <br>
                  <br>
                </p>
                <div class="row">
                  <div class="col-md-12 hidden-lg hidden-md hidden-sm text-left">
                    <a href="#"><i class="fa fa-3x fa-fw fa-instagram text-inverse"></i></a>
                    <a href="#"><i class="fa fa-3x fa-fw fa-twitter text-inverse"></i></a>
                    <a href="#"><i class="fa fa-3x fa-fw fa-facebook text-inverse"></i></a>
                    <a href="#"><i class="fa fa-3x fa-fw fa-github text-inverse"></i></a>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 hidden-xs text-right">
                    <a href="#"><i class="fa fa-3x fa-fw fa-instagram text-inverse"></i></a>
                    <a href="#"><i class="fa fa-3x fa-fw fa-twitter text-inverse"></i></a>
                    <a href="#"><i class="fa fa-3x fa-fw fa-facebook text-inverse"></i></a>
                    <a href="#"><i class="fa fa-3x fa-fw fa-github text-inverse"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  

</body></html>

