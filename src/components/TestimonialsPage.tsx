@@ .. @@
            {visibleCount < filteredTestimonials.length && (
              <div className="mt-12 text-center">
                <MagneticButton>
-                  <button
-                    onClick={loadMore}
-                    className="inline-flex items-center px-6 py-3 bg-[#A3D1FF] text-black rounded-lg hover:bg-[#92bce6] transition-colors"
-                  >
-                    Load More Testimonials
-                    <ArrowRight className="ml-2 w-5 h-5" />
-                  </button>
+                  <button onClick={loadMore} className="mr_btn mr_btn_primary">
+                    <span>Load More Testimonials</span>
+                  </button>
                </MagneticButton>
              </div>
            )}
@@ .. @@
             <MagneticButton>
-              <button 
-                onClick={() => navigate('/contact')}
-                className="inline-flex items-center px-6 py-3 bg-[#A3D1FF] text-black rounded-lg hover:bg-[#92bce6] transition-colors"
-              >
-                Start Your Project
-                <ArrowRight className="ml-2 w-5 h-5" />
-              </button>
+              <button onClick={() => navigate('/contact')} className="mr_btn mr_btn_primary">
+                <span>Start Your Project</span>
+              </button>
             </MagneticButton>