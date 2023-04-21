"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from web_fragments.fragment import Fragment
from xblock.core import XBlock
from xblock.fields import Integer, Scope, String

import logging
logger = logging.getLogger("log")

class BBBLiveXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    #count = Integer(
    #    default=0, scope=Scope.user_state,
    #    help="A simple counter, to show something happening",
    #)
    display_name = String(
        display_name="Display Name",
        default='直播课',
        scope=Scope.settings,
        help="This name appears in the horizontal navigation at the top of the page."
    )
    liveName = String(help="Live Name", default= "直播课01", scope=Scope.content)
    redlightUsername = String(help="redlight Username", default = "zhangp", scope=Scope.content)
    redlightPassword = String(help="redlight Password", default = "111222", scope=Scope.content)
    bbbURL = String(help="BBB URL", default = "https://live.bigedx.com:9000/zha-b9d1d1a03f", scope=Scope.content)
    bbbPassword = String(help="BBB Password", default = "485376", scope=Scope.content)
    thirdURL = String(help="third URL", default = "", scope=Scope.content)
    description = String(help="description", default = "简介", scope=Scope.content)
    
        
    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def studio_view(self, context=None):
        """
        Create a fragment used to display the edit view in the Studio.
        """
        html = self.resource_string("public/html/teacher.html")
        frag = Fragment(html.format(
            liveName=self.liveName, redlightUsername=self.redlightUsername, redlightPassword=self.redlightPassword,
            bbbURL=self.bbbURL, bbbPassword = self.bbbPassword, 
            thirdURL=self.thirdURL, description =self.description))
        frag.add_css(self.resource_string("public/css/bbblive.css"))
        frag.add_javascript(self.resource_string("public/js/src/bbblive.js"))
        frag.initialize_js('BBBLiveXBlock')
        return frag

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the BBBLiveXBlock, shown to students
        when viewing courses.
        """
        #html = self.resource_string("static/html/bbblive.html")
        #frag = Fragment(html.format(self=self))
        #frag.add_css(self.resource_string("static/css/bbblive.css"))
        #frag.add_javascript(self.resource_string("static/js/src/bbblive.js"))
        #frag.initialize_js('BBBLiveXBlock')
        #return frag      
        html = self.resource_string("public/html/student.html")
        play_image_url = self.runtime.local_resource_url(self, "public/images/playButton.png")
        frag = Fragment(html.format(
            liveNameLable=self.liveName, 
            redlightUsername=self.redlightUsername, 
            redlightPassword=self.redlightPassword,
            bbbURL=self.bbbURL, 
            thirdURL=self.thirdURL,
            bbbURLLable=self.bbbURL,
            bbbPasswordLable=self.bbbPassword,
            #bbbPlayButtonUrl=play_image_url,
            thirdURLLable=self.thirdURL, 
            descriptionLable=self.description))
        frag.add_css(self.resource_string("public/css/bbblive.css"))
        frag.add_javascript(self.resource_string("public/js/src/bbblive_student.js"))
        frag.initialize_js('BBBLiveXBlock', play_image_url)
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    #@XBlock.json_handler
    #def increment_count(self, data, suffix=''):
    #    """
    #    An example handler, which increments the data.
    #    """
    #    # Just to show data coming in...
    #    assert data['hello'] == 'world'
    #
    #    self.count += 1
    #    return {"count": self.count}
    
    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        """
        Called when submitting the form in Studio.
        """
        result = {'success': True, 'errors': []}
        self.liveName =data.get('liveName')
        self.redlightUsername = data.get('redlightUsername')
        self.redlightPassword = data.get('redlightPassword')
        self.bbbURL =data.get('bbbURL')
        self.bbbPassword = data.get('bbbPassword')
        self.thirdURL =data.get('thirdURL')
        self.description =data.get('description')

        return result

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("BBBLiveXBlock",
            """
            <bbblive/>
            """),
            ("Multiple BBBLiveXBlock",
             """<vertical_demo>
                <bbblive/>
                <bbblive/>
                <bbblive/>
                </vertical_demo>
             """),
        ]
